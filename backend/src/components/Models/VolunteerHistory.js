// backend/src/components/models/VolunteerHistory.js
const mongoose = require('mongoose');

const volunteerHistorySchema = new mongoose.Schema({
  // Now volunteer is just a string (e.g., "John Doe") instead of an ObjectId
  volunteer: {
    type: String,
    required: true
  },
  // Similarly, event is just a string (e.g., "Food Drive 2023")
  event: {
    type: String,
    required: true
  },
  participationStatus: {
    type: String,
    required: [true, 'Participation status is required'],
    enum: {
      values: ['Completed', 'Scheduled', 'Cancelled'],
      message: 'Participation status must be Completed, Scheduled, or Cancelled'
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('VolunteerHistory', volunteerHistorySchema);
