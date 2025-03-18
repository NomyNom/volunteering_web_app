// backend/src/components/models/UserProfile.js
const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  // Reference to the user credentials document
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'UserCredentials',
    required: true 
  },
  fullName: {
    type: String,
    required: [true, 'Full Name is required'],
    maxlength: [50, 'Full Name must be 50 characters or less']
  },
  address1: {
    type: String,
    required: [true, 'Address 1 is required'],
    maxlength: [100, 'Address 1 must be 100 characters or less']
  },
  address2: {
    type: String,
    maxlength: [100, 'Address 2 must be 100 characters or less']
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    maxlength: [100, 'City must be 100 characters or less']
  },
  state: {
    type: String,
    required: [true, 'State is required'],
    minlength: [2, 'State must be exactly 2 characters'],
    maxlength: [2, 'State must be exactly 2 characters']
  },
  zipCode: {
    type: String,
    required: [true, 'Zip Code is required'],
    minlength: [5, 'Zip Code must be at least 5 characters'],
    maxlength: [9, 'Zip Code must be no more than 9 characters']
  },
  skills: {
    type: [String],
    required: [true, 'At least one skill is required'],
    validate: {
      validator: function(v) {
        return Array.isArray(v) && v.length > 0;
      },
      message: 'At least one skill is required'
    }
  },
  preferences: String,
  availability: {
    type: [String],
    required: [true, 'At least one availability date is required'],
    validate: {
      validator: function(v) {
        return Array.isArray(v) && v.length > 0;
      },
      message: 'At least one availability date is required'
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('UserProfile', userProfileSchema);
