// backend/src/components/Routes/Auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserCredentials = require('../Models/UserCredentials'); 

// /api/auth

// Registration endpoint
router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;
  
  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Email and password are required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ msg: 'Password must be at least 6 characters long' });
  }
  
  try {
    // Check if the user already exists
    let user = await UserCredentials.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });
    
    // Create a new user document; password hashing is handled by the pre-save hook
    user = new UserCredentials({ email, password, role: role || 'volunteer' });
    await user.save();
    
    res.json({ 
      msg: 'User registered successfully', 
      user: { id: user._id, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ msg: 'Email and password are required' });
  }
  
  try {
    const user = await UserCredentials.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
    
    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
    
    // Create JWT payload
    const payload = { id: user._id, role: user.role };
    
    // Sign the token with your secret key and set an expiration time (e.g., 1 hour)
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({
        token,
        user: { id: user._id, email: user.email, role: user.role }
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;



// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// // In a real app, you would import your User model and use the database.
// let dummyUsers = [];

// // Registration endpoint
// router.post('/register', async (req, res) => {
//   const { email, password, role } = req.body;
  
//   // Validations
//   if (!email || !password) {
//     return res.status(400).json({ msg: 'Email and password are required' });
//   }
//   if (password.length < 6) {
//     return res.status(400).json({ msg: 'Password must be at least 6 characters long' });
//   }
//   const existingUser = dummyUsers.find((user) => user.email === email);
//   if (existingUser) return res.status(400).json({ msg: 'User already exists' });
  
//   // Normally hash the password; here we use it as-is for dummy purposes.
//   const newUser = { id: dummyUsers.length + 1, email, password, role: role || 'volunteer' };
//   dummyUsers.push(newUser);
  
//   res.json({ msg: 'User registered successfully (dummy)' });
// });

// // Login endpoint
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
  
//   if (!email || !password) {
//     return res.status(400).json({ msg: 'Email and password are required' });
//   }
  
//   const user = dummyUsers.find(u => u.email === email && u.password === password);
//   if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
  
//   // Return a dummy token
//   res.json({
//     token: 'dummy-token',
//     user: { id: user.id, email: user.email, role: user.role }
//   });
// });

// module.exports = router;
