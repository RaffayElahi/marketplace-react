require('dotenv').config();
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Product = require('../../model/Product.model')

const enrichProductData = async (productArray) => {
  const enrichedData = [];

  for (const [variantId, productCode, quantity] of productArray) {
    try {
      const product = await Product.findOne({
        productCode: productCode
      }).exec();

      if (!product) {
        console.error(`Product with code ${productCode} not found.`);
        continue;
      }

      const variant = product.variants.find(v => v.id === variantId);

      if (!variant) {
        console.error(`Variant with ID ${variantId} not found in product ${productCode}.`);
        continue;
      }

      let {
        name
      } = product;
      const {
        price,
        color,
        size
      } = variant;

      name = name
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .filter(word => word.length > 0)
        .join(' ');

      const sizeMap = {
        's': 'Small',
        'm': 'Medium',
        'l': 'Large'
      };
      const sizeAbbreviation = sizeMap[size.toLowerCase()] || size;

      name = `${name} ${color} ${sizeAbbreviation}`;

      name = name
        .replace(/\s+/g, ' ')
        .trim();

      enrichedData.push({
        productCode,
        name,
        price,
        quantity
      });
    } catch (error) {
      console.error(`Error processing productCode ${productCode}:`, error);
    }
  }

  return enrichedData;
};



router.post('/', async (req, res) => {
  if (!req.body.products || req.body.products.length === 0) {
    return res.status(400).send({
      error: 'No products provided.'
    });
  }
  const {
    products
  } = req.body;
  const data = await enrichProductData(products)

  const lineItems = data.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.name,
      },
      unit_amount: product.price * 100,
    },
    quantity: product.quantity
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.FRONTEND_URL}/success`,
    cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    billing_address_collection: 'required',
    shipping_address_collection: {
      allowed_countries: ['US', 'PK'],
    },
  });
  res.cookie('stripeSessionId', session.id, {
    httpOnly: true,
    secure: true,
    maxAge: 20 * 60 * 1000 * 5
  });
  res.json({
    id: session.id
  })
});

router.get('/session-status', async (req, res) => {
  const sessionId = req.cookies.stripeSessionId;
  if (!sessionId) {
    return res.status(404).send({
      error: 'Payment session was not found.'
    });
  }
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.send({
      id: session.id,
      details: session.customer_details,
      status: session.payment_status,
      customer_email: session.customer_email,
      total: session.amount_total,
      url: session.url
    });
  } catch (error) {
    res.status(500).send({
      error: error.message
    });
  }
});

module.exports = router;