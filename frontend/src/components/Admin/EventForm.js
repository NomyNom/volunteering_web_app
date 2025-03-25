// EventForm.js
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./EventForm.css";

function EventForm() {
  const navigate = useNavigate();
  const location = useLocation();

  // Original form state
  const [formData, setFormData] = useState({
    eventName: "",
    eventDescription: "",
    location: "",
    requiredSkills: [],
    urgency: "",
    eventDate: "",
  });

  // Raw skills input (comma-separated)
  const [rawSkills, setRawSkills] = useState("");
  const urgencyLevels = ["Low", "Medium", "High"];

  // Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Handle changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e) => {
    setRawSkills(e.target.value);
  };

  // Submit
  const handleSubmit = async (e) => {
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

    const skillsArray = rawSkills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill !== "");

    const eventData = { ...formData, requiredSkills: skillsArray };

    try {
      const response = await fetch("http://localhost:4000/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "Failed to create event"}`);
        return;
      }

      alert("Event created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Error creating event, please try again later.");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="event-form-container">
      {/* with-sidebar-container ensures the sidebar + main content layout */}
      <div className="with-sidebar-container">
        {/* SIDEBAR (like VolunteerHistory) */}
        {token && (
          <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
            <button
              className="toggle-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>

            <nav className="sidebar-links">
              {/* Always show Home link */}
              <Link
                to="/"
                className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
              >
                <span className="nav-icon">
                  {/* Home icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-14a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </span>
                <span className="nav-text">Home</span>
              </Link>

              {/* Admin Pages only */}
              {user?.role === "admin" && (
                <div className="nav-group">
                  <span className="nav-group-title">Admin Pages</span>
                  <Link
                    to="/admin/event"
                    className={`nav-item ${
                      location.pathname === "/admin/event" ? "active" : ""
                    }`}
                  >
                    <span className="nav-icon">
                      {/* Calendar icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </span>
                    <span className="nav-text">Event Management</span>
                  </Link>
                  <Link
                    to="/admin/matching"
                    className={`nav-item ${
                      location.pathname === "/admin/matching" ? "active" : ""
                    }`}
                  >
                    <span className="nav-icon">
                      {/* Users icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M7 21v-2a4 4 0 0 1 3-3.87" />
                        <circle cx="12" cy="7" r="4" />
                        <line x1="5.4" y1="19" x2="18.6" y2="19" />
                      </svg>
                    </span>
                    <span className="nav-text">Volunteer Matching</span>
                  </Link>
                </div>
              )}
            </nav>

            <div className="sidebar-logout">
              <button className="logout-btn" onClick={handleLogout}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="logout-icon"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        )}

        {/* MAIN CONTENT with the original white card layout */}
        <div className={`main-content ${token ? "with-sidebar" : ""}`}>
          {/* White card with heading inside, as originally */}
          <div className="event-form-card">
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
                  value={rawSkills}
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
      </div>
    </div>
  );
}

export default EventForm;
