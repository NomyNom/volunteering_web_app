// backend/src/components/routes/profile.js
const express = require('express');
const router = express.Router();

// Stub route: GET /api/profile
router.get('/', (req, res) => {
  res.json({ profile: { fullName: 'John Doe', city: 'Sample City' } });
});

// Stub route: PUT /api/profile
router.put('/', (req, res) => {
  res.json({ msg: 'Profile updated (stub)' });
});

module.exports = router;
