// backend/src/components/routes/auth.js
const express = require('express');
const router = express.Router();

// Stub route: POST /api/auth/register
router.post('/register', (req, res) => {
  res.json({ msg: 'User registered (stub)' });
});

// Stub route: POST /api/auth/login
// using dummy token for testing -- will implement a token system later on !!
router.post('/login', (req, res) => {
  res.json({ token: 'dummy-token', user: { id: '123', email: req.body.email, role: 'volunteer' } });
});

module.exports = router;