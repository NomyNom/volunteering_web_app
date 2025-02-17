// backend/src/components/routes/event.js
const express = require('express');
const router = express.Router();

// Stub route: POST /api/events
router.post('/', (req, res) => {
    res.json({ msg: 'Event created (stub)' });
  });
  
  // Stub route: GET /api/events
  router.get('/', (req, res) => {
    res.json({ events: [] });
  });
  
  module.exports = router;