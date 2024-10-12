const mongoose = require('mongoose');

// Define the schema for Product
const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true, // Ensure the ID is unique
  },
  name: {
    type: String,
    required: true, // Product name is required
  },
  price: {
    type: Number,
    required: true, // Product price is required
  },
  imageUrl: {
    type: String,
    required: true, // Product image URL is required
  },
  colorChoices: {
    type: [String], // Array of strings for color choices
    required: true, // Color choices are required
  },
  category: {
    type: String,
    required: true, 
  }
}, { timestamps: true }); 
 

module.exports = mongoose.model('Product', productSchema);
