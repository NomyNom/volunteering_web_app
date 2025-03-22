const express = require('express');
const router = express.Router();
const UserProfile = require('../models/UserProfile');

// GET /api/profile/:userId
router.get('/:userId', async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ user: req.params.userId });
    if (!profile) return res.status(404).json({ msg: "Profile not found" });
    res.json(profile);
  } catch (err) {
    if (err.name === 'CastError') return res.status(404).json({ msg: "Profile not found" });
    console.error(err);
    res.status(500).json({ msg: "Server error while retrieving profile" });
  }
});

// POST /api/profile
router.post('/', async (req, res) => {
    console.log("Incoming profile payload:", req.body);    // DEBUGGING

  const { user, fullName, address1, address2, city, state, zipCode, skills, preferences, availability } = req.body;
  if (!user || !fullName || !address1 || !city || !state || !zipCode || !skills || !availability) {
    return res.status(400).json({ msg: "Missing required fields" });
  }
  try {
    if (await UserProfile.findOne({ user })) {
      return res.status(400).json({ msg: "Profile already exists for this user" });
    }
    const newProfile = new UserProfile({ user, fullName, address1, address2: address2 || "", city, state, zipCode, skills, preferences: preferences || "", availability });
    await newProfile.save();
    res.status(201).json({ msg: "Profile created successfully", profile: newProfile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error while creating profile" });
  }
});

// PUT /api/profile/:userId
router.put('/:userId', async (req, res) => {
    const { fullName, address1, address2, city, state, zipCode, skills, preferences, availability } = req.body;
  
    // Only these five fields remain required
    if (!fullName || !address1 || !city || !state || !zipCode) {
      return res.status(400).json({ msg: "Missing required fields" });
    }
  
    try {
      const updateData = {
        fullName,
        address1,
        address2: address2 || "",
        city,
        state,
        zipCode,
        skills: Array.isArray(skills) ? skills : [],
        preferences: preferences || "",
        availability: Array.isArray(availability) ? availability : []
      };
  
      const updatedProfile = await UserProfile.findOneAndUpdate(
        { user: req.params.userId },
        updateData,
        { new: true, runValidators: true }
      );
  
      if (!updatedProfile) return res.status(404).json({ msg: "Profile not found" });
      res.json({ msg: "Profile updated successfully", profile: updatedProfile });
    } catch (err) {
      if (err.name === 'CastError') return res.status(404).json({ msg: "Profile not found" });
      console.error(err);
      res.status(500).json({ msg: "Server error while updating profile" });
    }
  });
  

// DELETE /api/profile/:userId
router.delete('/:userId', async (req, res) => {
  try {
    const deletedProfile = await UserProfile.findOneAndDelete({ user: req.params.userId });
    if (!deletedProfile) return res.status(404).json({ msg: "Profile not found" });
    res.json({ msg: "Profile deleted successfully" });
  } catch (err) {
    if (err.name === 'CastError') return res.status(404).json({ msg: "Profile not found" });
    console.error(err);
    res.status(500).json({ msg: "Server error while deleting profile" });
  }
});

module.exports = router;
