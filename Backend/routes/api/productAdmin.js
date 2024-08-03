require('dotenv').config()
const express = require('express');
const multer = require('multer');
const Product = require("../../model/Product.model")
const router = express.Router();
const path = require("path");
const verifyRoles = require('../../middleware/verifyRoles')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..','..','..','project/public/upload/'));
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

const upload = multer({ storage: storage });
  
router.post('/upload', verifyRoles('admin') ,upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'carouselImages', maxCount: 10 }
  ]), async (req, res) => {
    try {
      const { name, fabricInformation, description, category, status } = req.body;
      const variants = JSON.parse(req.body.variants || '[]'); 
      
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

module.exports = router;