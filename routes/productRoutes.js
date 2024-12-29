const express = require('express');
const router = express.Router();
const Product = require('../models/products');


router.post('/', async (req, res) => {
  
  try {
    const { name, price, description, category, stock } = req.body;

   
    if (!name || !price || !description || !category || !stock) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const product = new Product({ name, price, description, category, stock });
    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});
router.get('/', async (req, res) => {
  try {
      const products = await Product.find(); // Fetch all products
      res.status(200).json(products);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error', error });
  }
});
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const deletedProduct = await Product.findByIdAndDelete(id); // Find and delete the product by ID
      if (!deletedProduct) {
          return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error });
  }
});
 


  module.exports = router;