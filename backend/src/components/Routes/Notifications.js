// backend/src/components/routes/Notification.js
const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// GET /api/notifications - Retrieve all notifications
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json({ notifications });
  } catch (err) {
    console.error('Error retrieving notifications:', err);
    res.status(500).json({ error: 'Server error while retrieving notifications' });
  }
});

// POST /api/notifications - Create a new notification
router.post('/', async (req, res) => {
  const { message, date, read } = req.body;
  if (!message || typeof message !== 'string' || message.trim() === "") {
    return res.status(400).json({ error: 'Invalid or missing message' });
  }
  try {
    const newNotification = new Notification({
      message,
      date: date ? new Date(date) : undefined,
      read: typeof read === 'boolean' ? read : false
    });
    const savedNotification = await newNotification.save();
    res.status(201).json({
      msg: 'Notification added successfully',
      notification: savedNotification
    });
  } catch (err) {
    console.error('Error creating notification:', err);
    res.status(500).json({ error: 'Server error while creating notification' });
  }
});

// PUT /api/notifications/markAllAsRead - Mark all notifications as read
router.put('/markAllAsRead', async (req, res) => {
  try {
    await Notification.updateMany({}, { $set: { read: true } });
    res.json({ msg: 'All notifications marked as read' });
  } catch (err) {
    console.error('Error marking notifications as read:', err);
    res.status(500).json({ error: 'Server error while marking notifications as read' });
  }
});

// DELETE /api/notifications/:id - Delete a notification (optional)
router.delete('/:id', async (req, res) => {
  try {
    const deletedNotification = await Notification.findByIdAndDelete(req.params.id);
    if (!deletedNotification) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    res.json({ msg: 'Notification deleted successfully' });
  } catch (err) {
    console.error('Error deleting notification:', err);
    res.status(500).json({ error: 'Server error while deleting notification' });
  }
});

module.exports = router;
