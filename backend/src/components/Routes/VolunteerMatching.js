const express = require('express');
const router = express.Router();

// In-memory dummy "database" for volunteer matching records
let volunteerMatches = [
  { id: 1, volunteerName: 'Alice Johnson', matchedEvent: 'Community Clean-Up' },
  { id: 2, volunteerName: 'Bob Smith', matchedEvent: 'Food Drive' },
  { id: 3, volunteerName: 'Carol Davis', matchedEvent: 'Charity Marathon' }
];

// GET /api/volunteer/matching
// Returns the list of volunteer matches
router.get('/', (req, res) => {
  res.json({ matches: volunteerMatches });
});

// POST /api/volunteer/matching
// Adds a new volunteer match record (stub implementation)
router.post('/', (req, res) => {
  // For now, simply echo back the received match
  const newMatch = req.body;
  // Generate a new id
  newMatch.id = volunteerMatches.length > 0 
    ? volunteerMatches[volunteerMatches.length - 1].id + 1 
    : 1;
  volunteerMatches.push(newMatch);
  res.status(201).json({ msg: 'Volunteer match record added (stub)', match: newMatch });
});

module.exports = router;