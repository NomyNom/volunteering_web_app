// // backend/src/components/routes/VolunteerMatching.js
// const express = require('express');
// const router = express.Router();

// // Stub route: POST /api/events
// router.post('/', (req, res) => {
//     res.json({ msg: 'Event created (stub)' });
//   });
  
//   // Stub route: GET /api/events
//   router.get('/', (req, res) => {
//     res.json({ events: [] });
//   });
  
//   module.exports = router;

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