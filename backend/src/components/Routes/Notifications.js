const express = require('express');
const router = express.Router();

// In-memory "database" for notifications
let notifications = [
  { id: 1, message: "New volunteer opportunity: Community Cleanup", date: "2024-03-10", read: false },
  { id: 2, message: "Your registration for Food Drive was confirmed", date: "2024-03-09", read: true },
  { id: 3, message: "Reminder: Beach Cleanup starts tomorrow", date: "2024-03-08", read: false },
  { id: 4, message: "New event: School Supply Drive", date: "2024-03-07", read: false }
];

// Utility function to validate a notification record
const validateNotification = (notification) => {
  const errors = [];
  if (!notification.message || typeof notification.message !== 'string' || notification.message.trim() === "") {
    errors.push("Invalid or missing message.");
  }
  if (!notification.date || isNaN(Date.parse(notification.date))) {
    errors.push("Invalid or missing date.");
  }
  // Ensure read is a boolean; if not provided, you might set a default later.
  if (typeof notification.read !== 'boolean') {
    errors.push("Invalid or missing read status (must be boolean).");
  }
  return errors;
};

// GET /api/notifications - Retrieves all notifications
router.get('/', (req, res) => {
  res.json({ notifications });
});

// POST /api/notifications - Adds a new notification record
router.post('/', (req, res) => {
  const newNotification = req.body;
  // If 'read' is not provided, default it to false
  if (typeof newNotification.read !== 'boolean') {
    newNotification.read = false;
  }
  const errors = validateNotification(newNotification);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  newNotification.id = notifications.length > 0
    ? notifications[notifications.length - 1].id + 1
    : 1;
  notifications.push(newNotification);
  res.status(201).json({
    msg: "Notification added successfully",
    notification: newNotification
  });
});

// PUT /api/notifications/markAllAsRead - Marks all notifications as read
router.put('/markAllAsRead', (req, res) => {
  notifications = notifications.map(n => ({ ...n, read: true }));
  res.json({
    msg: "All notifications marked as read",
    notifications
  });
});


module.exports = router;