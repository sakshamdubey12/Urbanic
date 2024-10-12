const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: true,
    unique: true, 
    trim: true, 
  },
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order', // Reference to the Order model
  }],
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Reference to the Product model
  }],
  otp: {
    type: String,
    required: false, // OTP is temporarily stored
  },
  otpExpires: {
    type: Date, // OTP expiry time
    required: false,
  },
  isVerified: {
    type: Boolean,
    default: false, // Initially, the user is not verified
  }
}, { timestamps: true }); 

const User = mongoose.model('User', userSchema);

module.exports = User;
