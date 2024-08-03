require('dotenv').config()
const express = require('express');
const Product = require("../../model/Product.model")
const router = express.Router();


const getProductAndVariant = async (productCode) => {
  try {
    const product = await Product.findOne(
      { productCode },
    ).exec();

    if (!product) {
      throw new Error('Product not found');
    }

    const variant = product.variants;

    return {
      product,
      variant,
    };
  } catch (error) {
    console.error('Error fetching product and variant:', error);
    throw error;
  }
};
router.get('/product/:productCode/variant/:variantId', async (req, res) => {
  const { productCode, variantId } = req.params;

  try {
    const { product, variant } = await getProductAndVariant(productCode, variantId);
    res.status(200).json({
      product,
      variant,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/home', async(req, res)=>{
  try{
    const products = await Product.find().limit(4).exec()
    res.json(products)
  }catch(err){
    res.status(500).json({message: "Error fetching documents", err})
  }
})

router.get('/', async (req, res) => {
    try {
      const products = await Product.find().exec();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

router.get('/random', async (req, res) => {
  const { productCode } = req.query;

  try {
    const product = await Product.findOne(
      { productCode },
    ).exec();

    if (!product) {
      throw new Error('Product not found');
    }
    if (!productCode) {
      return res.status(400).json({ message: 'Product code is required' });
    }

    const products = await Product.find({ productCode: { $ne: productCode } }).exec();

    if (products.length < 4) {
      return res.status(404).json({ message: 'Not enough products available' });
    }

    const shuffledProducts = products.sort(() => 0.5 - Math.random());
    const selectedProducts = shuffledProducts.slice(0, 4);

    res.json(selectedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/search', async (req, res) => {
  const {productCode} = req.query
    try {
      const product = await Product.find({ productCode }).exec();
      if (!product || product.length===0) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});
  
router.get('/validate-cart', async (req, res) => {
  const cart = req.query.cart ? JSON.parse(req.query.cart) : [];

  let totalCost = 0;
  let validatedCart = [];
  let validationResult = { isValid: true, errors: [] };

  const cleanedCart = cart.filter(item => {
    return Array.isArray(item) && item.length === 3 && item.every(el => el !== null && el !== undefined);
  });

  for (const item of cleanedCart) {
    const [variantId, productCode, requestedQuantity] = item;

    try {
      const product = await Product.findOne({ productCode }).exec();
      if (!product) {
        item.push(`Product with code ${productCode} not found. Item removed from cart.`);
        continue; 
      }

      const variant = product.variants.find(v => v.id === variantId);
      if (!variant) {
        validationResult.errors.push(`Variant with ID ${variantId} not found for product ${productCode}. Item removed from cart.`);
        continue; 
      }

      if (requestedQuantity > variant.quantity) {
        validationResult.errors.push(`Requested quantity for variant ${variantId} exceeds available quantity for product ${productCode}. Item removed from cart.`);
        continue; 
      }
      if (requestedQuantity <= 0){
        continue;
      }

      const variantTotalCost = variant.price * requestedQuantity;
      totalCost += variantTotalCost;


      validatedCart.push([
        variantId,
        productCode,
        requestedQuantity,

      ],)}
     catch (error) {
      validationResult.errors.push(`Error processing product ${productCode}: ${error.message}`);
    }
  }

  validationResult.isValid = validationResult.errors.length === 0;
  res.json({ validationResult, totalCost, validatedCart });

});


module.exports = router;