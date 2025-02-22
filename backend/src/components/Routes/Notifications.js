// backend/src/components/routes/Notifications.js
const express = require('express');
const router = express.Router();

// Dummy notifications data
const dummyNotifications = [
  { id: 1, message: 'You have been assigned to Community Clean-Up.' },
  { id: 2, message: 'Food Drive event has been updated.' },
  { id: 3, message: 'Reminder: Volunteer at Charity Marathon tomorrow.' }
];

router.get('/', (req, res) => {
  res.json({ notifications: dummyNotifications });
});

module.exports = router;
