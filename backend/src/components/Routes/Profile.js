const express = require("express");
const router = express.Router();

// temp in memory storage for user profiles 
let userProfiles = {
    "123": {
        fullName: "John Doe",
        address1: "123 Main St",
        address2: "",
        city: "Houston",
        state: "TX",
        zip: "77001",
        skills: ["Test1", "Test2"],
        preferences: "Preference 1",
        availability: ["2025-03-05"]
    }
};

// GET /api/profile/:userId
// retrieve the profile for given user ID if it exists in memory
router.get("/:userId", (req, res) => {
    const userId = req.params.userId;
    const profile = userProfiles[userId];

    if (!profile) {
        return res.status(404).json({ msg: "Profile not found (dummy data)" });
    }

    res.json(profile);
});

// PUT /api/profile/:userId
// creates or updates a user profile (stored in memory)
router.put("/:userId", (req, res) => {
    const userId = req.params.userId;
    const { fullName, address1, address2, city, state, zip, skills, preferences, availability } = req.body;

    // Validations
    if (!fullName || !address1 || !city || !state || !zip) {
        return res.status(400).json({ msg: "Full Name, Address, City, State, and Zip are required" });
    }

    // store profile in memory (temp solution before database implementation)
    userProfiles[userId] = {
        fullName,
        address1,
        address2: address2 || "",
        city,
        state,
        zip,
        skills: skills || [],
        preferences: preferences || "",
        availability: availability || []
    };

    res.json({ msg: "Profile saved successfully (dummy data)", profile: userProfiles[userId] });
});

module.exports = router;
