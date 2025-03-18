// backend/src/components/models/VolunteerHistory.js
const mongoose = require('mongoose');

const volunteerHistorySchema = new mongoose.Schema({
  volunteer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserCredentials',
    required: true
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EventDetails',
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
