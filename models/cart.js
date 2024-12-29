const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Associate cart with a user
  items: [
    {
      _id: { type: String, required: true },
      quantity: { type: Number, required: false, },
      category: { type: Number, required: false, },

      createdAt: { type: Number, required: false, },

      description: { type: Number, required: false, },
      stock: { type: Number, required: false, },
      name: { type: String, required: false, },


         
      price: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model('Cart', cartSchema);
