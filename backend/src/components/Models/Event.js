// backend/src/components/models/Event.js
const mongoose = require('mongoose');

const Schema = moongoose.Schema

const eventSchema = new Schema({
  eventName: { 
    type: String, 
    required: true, 
    maxlength: 100 
  },
  eventDescription: { 
    type: String, 
    required: true 
  },
  location: { 
    type: String, 
    required: true 
  },
  requiredSkills: [{ 
    type: String, 
    required: true 
  }],
  urgency: { 
    type: String, 
    enum: ['Low', 'Medium', 'High'], 
    required: true 
  },
  eventDate: { 
    type: Date, 
    required: true 
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }
});

module.exports = mongoose.model('Event', eventSchema);
