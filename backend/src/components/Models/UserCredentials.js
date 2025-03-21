// backend/src/components/Models/UserCredentials.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
  },
  role: {
    type: String,
    enum: ['volunteer', 'admin'],
    default: 'volunteer',
    required: [true, 'Role is required']
  }
}, { timestamps: true });

// Pre-save hook: encrypts the password before saving
userCredentialsSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('UserCredentials', userCredentialsSchema);
