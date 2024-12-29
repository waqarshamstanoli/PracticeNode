const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');

// Add to Cart
router.post('/', async (req, res) => {
  const { userId, _id,  price, quantity, category, createdAt, description, stock, name } = req.body;
  console.log('All fields are', name);
  if (!userId || !_id || !price || !name) {
   

    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Find the user's cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new Cart({ userId, items: [] });
    }

    // Check if the product is already in the cart
    const existingItem = cart.items.find((item) => item._id === _id);

    if (existingItem) {
      // Update quantity if item exists
      existingItem.quantity += quantity;
    } else {
      // Add new item to cart
  console.log('All fields are required', req.body);

      cart.items.push({ _id, quantity, price, name });
  console.log('All fields are required', cart.items);

    }

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: 'Item added to cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
  
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
  
    try {
      // Find the cart for the given userId
      const cart = await Cart.findOne({ userId });
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      res.status(200).json({ message: 'Cart retrieved successfully', cart });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error });
    }
  });
  

module.exports = router;
