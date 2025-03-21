const express = require('express');
const router = express.Router();
const VolunteerHistory = require('../Models/VolunteerHistory');

// Helper function to validate volunteer history data
const validateVolunteerHistoryData = (volunteer, event, participationStatus) => {
  if (!volunteer || !event || !participationStatus) {
    return { isValid: false, error: 'All fields (volunteer, event, participationStatus) are required' };
  }
  if (typeof volunteer !== 'string' || typeof event !== 'string' || typeof participationStatus !== 'string') {
    return { isValid: false, error: 'Invalid data types' };
  }
  const allowedStatuses = ['Completed', 'Scheduled', 'Cancelled'];
  if (!allowedStatuses.includes(participationStatus)) {
    return { isValid: false, error: `Participation status must be one of ${allowedStatuses.join(', ')}` };
  }
  return { isValid: true };
};

// POST /api/volunteer/history - Create a new volunteer history record
router.post('/', async (req, res) => {
  const { volunteer, event, participationStatus } = req.body;
  const validation = validateVolunteerHistoryData(volunteer, event, participationStatus);
  if (!validation.isValid) {
    return res.status(400).json({ error: validation.error });
  }
  
  try {
    const newRecord = new VolunteerHistory({
      volunteer,
      event,
      participationStatus,
    });
    await newRecord.save();
    res.status(201).json({ msg: 'Volunteer history record added successfully', record: newRecord });
  } catch (err) {
    console.error('Error creating volunteer history record:', err);
    res.status(500).json({ error: 'Server error while creating volunteer history record' });
  }
});

// GET /api/volunteer/history - Retrieve all volunteer history records
router.get('/', async (req, res) => {
  try {
    // Use populate to get the full EventDetails document
    const records = await VolunteerHistory.find().populate('event');
    res.json({ records });
  } catch (err) {
    console.error('Error retrieving volunteer history records:', err);
    res.status(500).json({ error: 'Server error while retrieving volunteer history records' });
  }
});



// GET /api/volunteer/history/:id - Retrieve a specific volunteer history record by ID
router.get('/:id', async (req, res) => {
  try {
    const record = await VolunteerHistory.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ error: 'Volunteer history record not found' });
    }
    res.json({ record });
  } catch (err) {
    console.error('Error retrieving volunteer history record:', err);
    res.status(500).json({ error: 'Server error while retrieving volunteer history record' });
  }
});

// PUT /api/volunteer/history/:id - Update a specific volunteer history record by ID
router.put('/:id', async (req, res) => {
  const { volunteer, event, participationStatus } = req.body;
  const validation = validateVolunteerHistoryData(volunteer, event, participationStatus);
  if (!validation.isValid) {
    return res.status(400).json({ error: validation.error });
  }
  
  try {
    const record = await VolunteerHistory.findByIdAndUpdate(
      req.params.id,
      { volunteer, event, participationStatus },
      { new: true, runValidators: true }
    );
    if (!record) {
      return res.status(404).json({ error: 'Volunteer history record not found' });
    }
    res.json({ msg: 'Volunteer history record updated', record });
  } catch (err) {
    console.error('Error updating volunteer history record:', err);
    res.status(500).json({ error: 'Server error while updating volunteer history record' });
  }
});

// DELETE /api/volunteer/history/:id - Delete a specific volunteer history record by ID
router.delete('/:id', async (req, res) => {
  try {
    const record = await VolunteerHistory.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).json({ error: 'Volunteer history record not found' });
    }
    res.json({ msg: 'Volunteer history record deleted' });
  } catch (err) {
    console.error('Error deleting volunteer history record:', err);
    res.status(500).json({ error: 'Server error while deleting volunteer history record' });
  }
});

module.exports = router;
