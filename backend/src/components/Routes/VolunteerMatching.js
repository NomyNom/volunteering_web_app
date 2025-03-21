// backend/src/components/routes/VolunteerMatching.js
const express = require('express');
const router = express.Router();
const VolunteerMatching = require('../models/VolunteerMatching');

// GET /api/volunteer/matching - Retrieve all volunteer matching records
router.get('/', async (req, res) => {
  try {
    const matches = await VolunteerMatching.find().sort({ createdAt: -1 });
    res.json({ matches });
  } catch (err) {
    console.error('Error retrieving volunteer matching records:', err);
    res.status(500).json({ error: 'Server error while retrieving volunteer matching records' });
  }
});

// POST /api/volunteer/matching - Create a new volunteer matching record
router.post('/', async (req, res) => {
  const { volunteerName, matchedEvent } = req.body;
  if (!volunteerName || !matchedEvent) {
    return res.status(400).json({ error: 'Both volunteerName and matchedEvent are required.' });
  }
  try {
    const newMatch = new VolunteerMatching({ volunteerName, matchedEvent });
    const savedMatch = await newMatch.save();
    res.status(201).json({ msg: 'Volunteer match record added successfully', match: savedMatch });
  } catch (err) {
    console.error('Error creating volunteer matching record:', err);
    res.status(500).json({ error: 'Server error while creating volunteer matching record' });
  }
});

// Optional: DELETE /api/volunteer/matching/:id - Delete a volunteer matching record
router.delete('/:id', async (req, res) => {
  try {
    const deletedMatch = await VolunteerMatching.findByIdAndDelete(req.params.id);
    if (!deletedMatch) {
      return res.status(404).json({ error: 'Volunteer match record not found' });
    }
    res.json({ msg: 'Volunteer match record deleted successfully' });
  } catch (err) {
    console.error('Error deleting volunteer matching record:', err);
    res.status(500).json({ error: 'Server error while deleting volunteer matching record' });
  }
});

module.exports = router;
