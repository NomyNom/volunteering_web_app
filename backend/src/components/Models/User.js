// backend/src/components/models/User.js
const mongoose = require('mongoose');

const Schema = moongoose.Schema

const userSchema = new Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['volunteer', 'admin'], 
    default: 'volunteer' 
  },
  fullName: String,
  address1: String,
  address2: String,
  city: String,
  state: String,
  zipCode: String,
  skills: [String],
  preferences: String,
  availability: [String]
});

module.exports = mongoose.model('User', userSchema);
