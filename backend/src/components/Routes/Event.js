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
    console.error(err);
    res.status(500).json({ error: 'Server error while deleting event' });
  }
});

module.exports = router;





// const express = require('express');
// const router = express.Router();

// // In-memory storage for events (replace with MongoDB later)
// let events = [
//   {
//     id: '1a2b3c4d',
//     eventName: 'Community Clean-Up',
//     eventDescription: 'Help clean up the local park and surrounding areas.',
//     location: 'Central Park, New York',
//     requiredSkills: ['cleaning', 'organizing'],
//     urgency: 'high',
//     eventDate: '2023-12-15',
//   },
//   {
//     id: '5e6f7g8h',
//     eventName: 'Food Drive',
//     eventDescription: 'Collect and distribute food to those in need.',
//     location: 'Downtown Shelter, Los Angeles',
//     requiredSkills: ['logistics', 'communication'],
//     urgency: 'medium',
//     eventDate: '2023-11-20',
//   },
//   {
//     id: '9i0j1k2l',
//     eventName: 'Charity Marathon',
//     eventDescription: 'Run to raise funds for local charities.',
//     location: 'Golden Gate Park, San Francisco',
//     requiredSkills: ['event planning', 'fundraising'],
//     urgency: 'low',
//     eventDate: '2024-01-10',
//   },
// ];

// // Helper function to validate event data
// const validateEventData = (eventName, eventDescription, location, requiredSkills, urgency, eventDate) => {
//   if (!eventName || !eventDescription || !location || !requiredSkills || !urgency || !eventDate) {
//     return { isValid: false, error: 'All fields are required' };
//   }
//   if (
//     typeof eventName !== 'string' ||
//     typeof eventDescription !== 'string' ||
//     typeof location !== 'string' ||
//     !Array.isArray(requiredSkills) ||
//     typeof urgency !== 'string' ||
//     typeof eventDate !== 'string'
//   ) {
//     return { isValid: false, error: 'Invalid data types' };
//   }
//   return { isValid: true };
// };

// // POST /api/events - Create a new event
// router.post('/', (req, res) => {
//   const { eventName, eventDescription, location, requiredSkills, urgency, eventDate } = req.body;

//   // Validate event data
//   const validation = validateEventData(eventName, eventDescription, location, requiredSkills, urgency, eventDate);
//   if (!validation.isValid) {
//     return res.status(400).json({ error: validation.error });
//   }

//   // Create a new event
//   const newEvent = {
//     id: Math.random().toString(36).substr(2, 9), // Generate a random ID
//     eventName,
//     eventDescription,
//     location,
//     requiredSkills,
//     urgency,
//     eventDate,
//   };

//   // Add the event to the in-memory storage
//   events.push(newEvent);

//   // Respond with the created event
//   res.status(201).json({ msg: 'Event created', event: newEvent });
// });

// // GET /api/events - Get all events
// router.get('/', (req, res) => {
//   // Respond with the list of events
//   res.json({ events });
// });

// // GET /api/events/:id - Get a specific event by ID
// router.get('/:id', (req, res) => {
//   const eventId = req.params.id;

//   // Find the event by ID
//   const event = events.find((e) => e.id === eventId);

//   if (!event) {
//     return res.status(404).json({ error: 'Event not found' });
//   }

//   // Respond with the event
//   res.json({ event });
// });

// // PUT /api/events/:id - Update a specific event by ID
// router.put('/:id', (req, res) => {
//   const eventId = req.params.id;
//   const { eventName, eventDescription, location, requiredSkills, urgency, eventDate } = req.body;

//   // Validate event data
//   const validation = validateEventData(eventName, eventDescription, location, requiredSkills, urgency, eventDate);
//   if (!validation.isValid) {
//     return res.status(400).json({ error: validation.error });
//   }

//   // Find the event by ID
//   const eventIndex = events.findIndex((e) => e.id === eventId);

//   if (eventIndex === -1) {
//     return res.status(404).json({ error: 'Event not found' });
//   }

//   // Update the event
//   events[eventIndex] = {
//     ...events[eventIndex],
//     eventName,
//     eventDescription,
//     location,
//     requiredSkills,
//     urgency,
//     eventDate,
//   };

//   // Respond with the updated event
//   res.json({ msg: 'Event updated', event: events[eventIndex] });
// });

// // DELETE /api/events/:id - Delete a specific event by ID
// router.delete('/:id', (req, res) => {
//   const eventId = req.params.id;

//   // Find the event by ID
//   const eventIndex = events.findIndex((e) => e.id === eventId);

//   if (eventIndex === -1) {
//     return res.status(404).json({ error: 'Event not found' });
//   }

//   // Remove the event from the in-memory storage
//   events.splice(eventIndex, 1);

//   // Respond with a success message
//   res.json({ msg: 'Event deleted' });
// });

// module.exports = router;