// // backend/src/components/routes/auth.js
// const express = require('express');
// const router = express.Router();

// // Stub route: POST /api/auth/register
// router.post('/register', (req, res) => {
//   res.json({ msg: 'User registered (stub)' });
// });

// // Stub route: POST /api/auth/login
// // using dummy token for testing -- will implement a token system later on !!
// router.post('/login', (req, res) => {
//   res.json({ token: 'dummy-token', user: { id: '123', email: req.body.email, role: 'volunteer' } });
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
// In a real app, you would import your User model and use the database.
let dummyUsers = [];

// Registration endpoint
router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;
  
  // Validations
  if (!email || !password) {
    return res.status(400).json({ msg: 'Email and password are required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ msg: 'Password must be at least 6 characters long' });
  }
  const existingUser = dummyUsers.find((user) => user.email === email);
  if (existingUser) return res.status(400).json({ msg: 'User already exists' });
  
  // Normally hash the password; here we use it as-is for dummy purposes.
  const newUser = { id: dummyUsers.length + 1, email, password, role: role || 'volunteer' };
  dummyUsers.push(newUser);
  
  res.json({ msg: 'User registered successfully (dummy)' });
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ msg: 'Email and password are required' });
  }
  
  const user = dummyUsers.find(u => u.email === email && u.password === password);
  if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
  
  // Return a dummy token
  res.json({
    token: 'dummy-token',
    user: { id: user.id, email: user.email, role: user.role }
  });
});

module.exports = router;
