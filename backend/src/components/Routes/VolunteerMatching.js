// backend/components/Routes/VolunteerMatching.js
const express = require('express');
const router = express.Router();

// GET /api/volunteers/matching
router.get('/matching', (req, res) => {
  const dummyMatches = [
    { volunteerName: 'Alice Johnson', matchedEvent: 'Community Clean-Up' },
    { volunteerName: 'Bob Smith', matchedEvent: 'Food Drive' },
    { volunteerName: 'Carol Davis', matchedEvent: 'Charity Marathon' },
  ];
  res.json({ matches: dummyMatches });
});

module.exports = router;