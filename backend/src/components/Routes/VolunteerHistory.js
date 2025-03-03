// backend/src/components/routes/VolunteerHistory.js
const express = require('express');
const router = express.Router();

// In-memory "database" for volunteer history records
let volunteerHistoryRecords = [
  {
    id: 1,
    eventName: "Food Drive 2023",
    eventDescription: "Annual community food collection event to help local shelters.",
    location: "City Square",
    requiredSkills: ["Organization", "Teamwork"],
    urgency: "High",
    eventDate: "2023-12-15",
    participationStatus: "Completed"
  }
];

// Utility function to validate a volunteer history record
const validateRecord = (record) => {
  const errors = [];
  if (!record.eventName || typeof record.eventName !== 'string' || record.eventName.length > 100) {
    errors.push("Invalid or missing eventName (max 100 characters).");
  }
  if (!record.eventDescription || typeof record.eventDescription !== 'string' || record.eventDescription.length > 500) {
    errors.push("Invalid or missing eventDescription (max 500 characters).");
  }
  if (!record.location || typeof record.location !== 'string' || record.location.length > 100) {
    errors.push("Invalid or missing location (max 100 characters).");
  }
  if (!record.requiredSkills || !Array.isArray(record.requiredSkills)) {
    errors.push("Invalid or missing requiredSkills (must be an array).");
  }
  if (!record.urgency || !["Low", "Medium", "High"].includes(record.urgency)) {
    errors.push("Invalid or missing urgency (must be 'Low', 'Medium', or 'High').");
  }
  if (!record.eventDate || isNaN(Date.parse(record.eventDate))) {
    errors.push("Invalid or missing eventDate.");
  }
  if (!record.participationStatus || typeof record.participationStatus !== 'string') {
    errors.push("Invalid or missing participationStatus.");
  }
  return errors;
};

// GET /api/volunteer/history - Retrieves all volunteer history records
router.get('/', (req, res) => {
  res.json({ records: volunteerHistoryRecords });
});

// POST /api/volunteer/history - Adds a new volunteer history record
router.post('/', (req, res) => {
  const newRecord = req.body;
  const errors = validateRecord(newRecord);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  newRecord.id = volunteerHistoryRecords.length > 0
    ? volunteerHistoryRecords[volunteerHistoryRecords.length - 1].id + 1
    : 1;
  volunteerHistoryRecords.push(newRecord);
  res.status(201).json({
    msg: "Volunteer history record added successfully",
    record: newRecord
  });
});

module.exports = router;

