const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const UserCredentials = require('../Models/UserCredentials');

// Registration endpoint
router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password) return res.status(400).json({ msg: 'Email and password are required' });
  if (password.length < 6) return res.status(400).json({ msg: 'Password must be at least 6 characters long' });

  try {
    const hashed = await bcrypt.hash(password, 10);
    const newUser = await UserCredentials.create({ email, password: hashed });
    res.json({ msg: 'User registered successfully' });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ msg: 'Email already exists' });
    console.error(err);
    res.status(500).json({ msg: 'Server error during registration' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ msg: 'Email and password are required' });

  try {
    const user = await UserCredentials.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    res.json({
      token: 'dummy-token',
      user: { _id: user._id.toString(), email: user.email }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error during login' });
  }
});

module.exports = router;
