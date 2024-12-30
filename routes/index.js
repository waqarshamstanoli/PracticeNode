const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { validateUser } = require('../middleware/Validation');
const bcrypt = require('bcrypt');
const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const cartRoutes = require('./cartRoutes');

const jwt = require('jsonwebtoken');







router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/cart', cartRoutes);
router.post('/register', validateUser, async (req, res) => {
  console.log('validateUser',req)
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already registered' });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'An error occurred while registering' });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
const secretKey = 'p9c025YrTAcDeKWX277O1ihxSYjOQfNS'; 
const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
    res.json({ message: 'Login successful',token,  userId: user._id });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/', (req, res) => {
  res.send('Hello, world!',process.env.MONGODB_URI);
  console.error('Error during login:');
});




router.get('/about', (req, res) => {
    res.json([{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }]);
});

module.exports = router;