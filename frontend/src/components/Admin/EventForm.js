import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './EventForm.css';

function EventForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    eventName: "",
    eventDescription: "",
    location: "",
    requiredSkills: [],
    urgency: "",
    eventDate: "",
  });

  const urgencyLevels = ["Low", "Medium", "High"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSkillsChange = (e) => {
    const skillsArray = e.target.value
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill !== "");

    setFormData((prevData) => ({
      ...prevData,
      requiredSkills: skillsArray,
    }));
  };

  const skillsValue = formData.requiredSkills.join(", ");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.eventName ||
      !formData.eventDescription ||
      !formData.location ||
      !formData.urgency ||
      !formData.eventDate
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    console.log("✅ Event Created:", formData);
    alert("🎉 Event created successfully!");
    navigate("/"); // Redirect to home page after submission
  };

  return (
    <div className="event-form-container">
      <div className="event-form-card">
        <div className="back-button-container">
          <Link to="/" className="back-button">
            Back to Home
          </Link>
        </div>
        <h2>Create Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="eventName">Event Name:</label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="eventDescription">Event Description:</label>
            <textarea
              id="eventDescription"
              name="eventDescription"
              value={formData.eventDescription}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="requiredSkills">Required Skills:</label>
            <input
              type="text"
              id="requiredSkills"
              name="requiredSkills"
              placeholder="e.g. Communication, Teamwork, Leadership"
              value={skillsValue}
              onChange={handleSkillsChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="urgency">Urgency:</label>
            <select
              id="urgency"
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Urgency --</option>
              {urgencyLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="eventDate">Event Date:</label>
            <input
              type="date"
              id="eventDate"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-primary">
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default EventForm;