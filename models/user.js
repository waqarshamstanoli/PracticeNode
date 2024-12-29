const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
