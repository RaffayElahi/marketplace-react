const mongoose = require("mongoose");

// Define the schema
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [1, "Name must be at least 1 character long"]
  },
  fabricInformation: {
    type: String,
    minlength: [1, "Fabric Information must be at least 1 character long"]
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minlength: [1, "Description must be at least 1 character long"]
  },
  variants: [{
    color: {
      type: String,
      required: [true, "Color is required"],
      minlength: [1, "Color must be at least 1 character long"]
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"]
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0.01, "Price must be at least 0.01"]
    },
    size: {
      type: String,
      enum: ['s', 'm', 'l'],
      required: [true, "Size is required"]
    }
  }],
  category: {
    type: String,
    required: [true, "Category is required"],
    minlength: [1, "Category must be at least 1 character long"]
  },
  status: {
    type: String,
    enum: ['active', 'archive'],
    default: 'active',
    required: [true, "Status is required"]
  },
  mainImage: {
    type: String,
    required: [true, "Main image is required"]
  },
  carouselImages: [{
    name: {
      type: String,
      required: [true, "Image name is required"]
    },
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  productCode: {
    type: String,
    unique: true
  }
});

// Indexing productCode
ProductSchema.index({ productCode: 1 });

// Pre-save hook to generate productCode
ProductSchema.pre('save', async function (next) {
  if (!this.productCode) {
    try {
      const productCount = await mongoose.model('Product').countDocuments();
      this.productCode = `P${productCount + 1}`;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

// Create the model
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;