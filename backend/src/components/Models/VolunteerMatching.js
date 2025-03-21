// backend/src/components/models/VolunteerMatching.js
const mongoose = require('mongoose');

const volunteerMatchingSchema = new mongoose.Schema({
  volunteerName: {
    type: String,
    required: true
  },
  matchedEvent: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('VolunteerMatching', volunteerMatchingSchema);
