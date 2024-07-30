require('dotenv').config()
const express = require('express');
const multer = require('multer');
const Product = require("../../model/Product.model")
const router = express.Router();
const path = require("path")


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..','..','..','project/public/upload/'));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post('/upload', upload.fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'carouselImages', maxCount: 10 }
]), async (req, res) => {
  try {
    const { name, fabricInformation, description, category, status } = req.body;
    const variants = JSON.parse(req.body.variants || '[]'); // Parse variants from JSON

    // Log values to debug
    console.log('Received data:', { name, fabricInformation, description, category, status, variants });
    
    if (!fabricInformation) {
      throw new Error('Fabric Information is required');
    }

    const product = new Product({
      name,
      fabricInformation,
      description,
      category,
      status,
      mainImage: req.files.mainImage ? req.files.mainImage[0].filename : null,
      carouselImages: req.files.carouselImages ? req.files.carouselImages.map(file => ({
        name: file.filename,
      })) : [],
      variants: variants.map(variant => ({
        color: variant.color,
        quantity: parseInt(variant.quantity, 10),
        price: parseFloat(variant.price),
        size: variant.size
      }))
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

const getProductAndVariant = async (productCode, variantId) => {
  try {
    // Find the product by productCode and exclude the variants property
    const product = await Product.findOne(
      { productCode },
       // Projection to exclude the variants field
    ).exec();

    if (!product) {
      throw new Error('Product not found');
    }

    // Find the specific variant by variantId within the variants array
    const variant = product.variants;

    // Return the product and the variant
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

  // Filter out null, undefined, or empty arrays from cart
  const cleanedCart = cart.filter(item => {
    return Array.isArray(item) && item.length === 3 && item.every(el => el !== null && el !== undefined);
  });

  for (const item of cleanedCart) {
    const [variantId, productCode, requestedQuantity] = item;

    try {
      // Find the product by productCode
      const product = await Product.findOne({ productCode }).exec();
      if (!product) {
        item.push(`Product with code ${productCode} not found. Item removed from cart.`);
        continue; // Skip this item
      }

      // Find the variant by variantId
      const variant = product.variants.find(v => v.id === variantId);
      if (!variant) {
        validationResult.errors.push(`Variant with ID ${variantId} not found for product ${productCode}. Item removed from cart.`);
        continue; // Skip this item
      }

      // Check if the requested quantity is available
      if (requestedQuantity > variant.quantity) {
        validationResult.errors.push(`Requested quantity for variant ${variantId} exceeds available quantity for product ${productCode}. Item removed from cart.`);
        continue; // Skip this item
      }
      if (requestedQuantity <= 0){
        continue;
      }

      // Calculate the cost for the variant
      const variantTotalCost = variant.price * requestedQuantity;
      totalCost += variantTotalCost;

      // Add validated item to the response
      validatedCart.push([
        variantId,
        productCode,
        requestedQuantity,

      ],)}
     catch (error) {
      validationResult.errors.push(`Error processing product ${productCode}: ${error.message}`);
    }
  }

  // Determine if the validation was successful based on the errors
  validationResult.isValid = validationResult.errors.length === 0;
  res.json({ validationResult, totalCost, validatedCart });


});


module.exports = router;