// backend/src/components/Models/EventDetails.js
const mongoose = require('mongoose');

const eventDetailsSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: [true, 'Event Name is required'],
    maxlength: [100, 'Event Name must be 100 characters or less']
  },
  eventDescription: {
    type: String,
    required: [true, 'Event Description is required']
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  requiredSkills: {
    type: [String],
    required: [true, 'At least one required skill is needed']
  },
  urgency: {
    type: String,
    required: [true, 'Urgency is required'],
    enum: {
      values: ['Low', 'Medium', 'High'],
      message: 'Urgency must be Low, Medium, or High'
    }
  },
  eventDate: {
    type: Date,
    required: [true, 'Event Date is required']
  }
}, { timestamps: true });

module.exports = mongoose.model('EventDetails', eventDetailsSchema);
