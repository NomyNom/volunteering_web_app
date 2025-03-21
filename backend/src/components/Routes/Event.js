const express = require('express');
const router = express.Router();
const EventDetails = require('../Models/EventDetails');

// Helper function to validate event data
const validateEventData = (eventName, eventDescription, location, requiredSkills, urgency, eventDate) => {
  if (!eventName || !eventDescription || !location || !requiredSkills || !urgency || !eventDate) {
    return { isValid: false, error: 'All fields are required' };
  }
  if (
    typeof eventName !== 'string' ||
    typeof eventDescription !== 'string' ||
    typeof location !== 'string' ||
    !Array.isArray(requiredSkills) ||
    typeof urgency !== 'string' ||
    typeof eventDate !== 'string'
  ) {
    return { isValid: false, error: 'Invalid data types' };
  }
  // Check that eventDate is a valid date string
  if (isNaN(Date.parse(eventDate))) {
    return { isValid: false, error: 'Invalid event date' };
  }
  return { isValid: true };
};

// POST /api/events - Create a new event
router.post('/', async (req, res) => {
  const { eventName, eventDescription, location, requiredSkills, urgency, eventDate } = req.body;
  const validation = validateEventData(eventName, eventDescription, location, requiredSkills, urgency, eventDate);
  if (!validation.isValid) {
    return res.status(400).json({ error: validation.error });
  }
  
  try {
    const newEvent = new EventDetails({
      eventName,
      eventDescription,
      location,
      requiredSkills,
      urgency,
      eventDate,
    });
    await newEvent.save();
    res.status(201).json({ msg: 'Event created', event: newEvent });
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ error: 'Server error while creating event' });
  }
});

// GET /api/events - Get all events
router.get('/', async (req, res) => {
  try {
    const events = await EventDetails.find();
    res.json({ events });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while retrieving events' });
  }
});

// GET /api/events/:id - Get a specific event by ID
router.get('/:id', async (req, res) => {
  const eventId = req.params.id;
  try {
    const event = await EventDetails.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json({ event });
  } catch (err) {
    // Handle invalid ObjectId
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Event not found' });
    }
    console.error(err);
    res.status(500).json({ error: 'Server error while retrieving event' });
  }
});

// PUT /api/events/:id - Update a specific event by ID
router.put('/:id', async (req, res) => {
  const eventId = req.params.id;
  const { eventName, eventDescription, location, requiredSkills, urgency, eventDate } = req.body;
  const validation = validateEventData(eventName, eventDescription, location, requiredSkills, urgency, eventDate);
  if (!validation.isValid) {
    return res.status(400).json({ error: validation.error });
  }
  
  try {
    const event = await EventDetails.findByIdAndUpdate(
      eventId,
      { eventName, eventDescription, location, requiredSkills, urgency, eventDate },
      { new: true, runValidators: true }
    );
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json({ msg: 'Event updated', event });
  } catch (err) {
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Event not found' });
    }
    console.error(err);
    res.status(500).json({ error: 'Server error while updating event' });
  }
});

// DELETE /api/events/:id - Delete a specific event by ID
router.delete('/:id', async (req, res) => {
  const eventId = req.params.id;
  try {
    const event = await EventDetails.findByIdAndDelete(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json({ msg: 'Event deleted' });
  } catch (err) {
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Event not found' });
    }
    console.error(err);
    res.status(500).json({ error: 'Server error while deleting event' });
  }
});

module.exports = router;
