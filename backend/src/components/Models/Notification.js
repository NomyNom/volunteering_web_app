// backend/src/components/models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: [true, 'Notification message is required']
  },
  date: {
    type: Date,
    required: [true, 'Notification date is required'],
    default: Date.now
  },
  read: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
