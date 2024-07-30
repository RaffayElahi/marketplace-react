require('dotenv').config();
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Product = require('../../model/Product.model')

const enrichProductData = async (productArray) => {
  const enrichedData = [];

  for (const [variantId, productCode, quantity] of productArray) {
      try {
          // Find the product by productCode
          const product = await Product.findOne({ productCode: productCode }).exec();
          
          if (!product) {
              console.error(`Product with code ${productCode} not found.`);
              continue;
          }

          // Find the variant with the specified ID
          const variant = product.variants.find(v => v.id === variantId);
          
          if (!variant) {
              console.error(`Variant with ID ${variantId} not found in product ${productCode}.`);
              continue;
          }

          // Extract and format the details
          let { name } = product;
          const { price, color, size } = variant;

          // Capitalize the first letter of each word and normalize spaces
          name = name
              .toLowerCase()
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .filter(word => word.length > 0) // Filter out any empty strings resulting from multiple spaces
              .join(' ');

          // Map size values
          const sizeMap = {
              's': 'Small',
              'm': 'Medium',
              'l': 'Large'
          };
          const sizeAbbreviation = sizeMap[size.toLowerCase()] || size; // Default to original size if not found

          // Append color and size to the name
          name = `${name} ${color} ${sizeAbbreviation}`;

          // Normalize spaces again after appending color and size
          name = name
              .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
              .trim(); // Remove leading and trailing spaces

          // Append the details to the enrichedData array
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
    return res.status(400).send({ error: 'No products provided.' });
  }
  const {products} = req.body;
  const data = await enrichProductData(products)

  const lineItems = data.map((product)=>({
    price_data:{
        currency:"usd",
        product_data:{
            name:product.name,
        },
        unit_amount:product.price * 100,
    },
    quantity:product.quantity
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types:["card"],
    line_items:lineItems,
    mode:"payment",
    success_url:`${process.env.FRONTEND_URL}/sucess`,
    cancel_url:`${process.env.FRONTEND_URL}/cancel`,
  });

  res.json({id:session.id})
  

  console.log(data)
});

router.get('/session-status', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

    res.send({
      status: session.payment_status,
      customer_email: session.customer_email,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;