// backend/src/components/models/UserCredentials.js
const mongoose = require('mongoose');

const userCredentialsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  }
}, { timestamps: true });

module.exports = mongoose.model('UserCredentials', userCredentialsSchema);
