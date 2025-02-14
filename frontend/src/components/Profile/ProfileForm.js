import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [skills, setSkills] = useState([]);
  const [preferences, setPreferences] = useState("");
  const [availability, setAvailability] = useState([]);
  const [dateInput, setDateInput] = useState("");

  const stateOptions = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  ];

  const skillOptions = ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (zip.length < 5) {
      alert("Zip code must be at least 5 characters.");
      return;
    }
    console.log("Profile submitted:", {
      fullName,
      address1,
      city,
      state,
      zip,
      skills,
      preferences,
      availability,
    });
    alert("Profile saved successfully!");
    navigate("/"); // Redirect to home page after saving the profile
  };

  // Handler for adding a date when the user clicks the "Add Date" button.
  const handleAddDate = () => {
    if (dateInput) {
      // Regex to ensure the date is complete in the format YYYY-MM-DD
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (dateRegex.test(dateInput)) {
        setAvailability([...availability, dateInput]);
        setDateInput(""); // Clear the date input after adding
      } else {
        alert("Please enter a complete valid date in the format YYYY-MM-DD.");
      }
    }
  };

  return (
    <div className="profile-container">
      {/* Header with Home button */}
      <header className="profile-header">
        <Link to="/" className="home-button">Home</Link>
      </header>

      <h2>Profile Management Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input
          type="text"
          maxLength={50}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <label>Address 1</label>
        <input
          type="text"
          maxLength={100}
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
          required
        />

        <label>Address 2</label>
        <input
          type="text"
          maxLength={100}
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
        />

        <label>City</label>
        <input
          type="text"
          maxLength={100}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />

        <label>State</label>
        <select value={state} onChange={(e) => setState(e.target.value)} required>
          <option value="">Select State</option>
          {stateOptions.map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>

        <label>Zip Code</label>
        <input
          type="text"
          maxLength={9}
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          required
        />

        <label>Skills</label>
        <select
          multiple
          value={skills}
          onChange={(e) =>
            setSkills(Array.from(e.target.selectedOptions, (option) => option.value))
          }
          required
        >
          {skillOptions.map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
        </select>

        <label>Preferences</label>
        <textarea
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
        />

        <label>Availability</label>
        {/* 
          Using a controlled date input with an "Add Date" button.
          The date is only added when the user clicks the button.
        */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="date"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
          />
          <button type="button" onClick={handleAddDate} style={{ marginLeft: "0.5rem", padding: "0.5rem" }}>
            Add Date
          </button>
        </div>
        <div>
          {availability.length > 0 && (
            <p>Selected Dates: {availability.join(", ")}</p>
          )}
        </div>

        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}

export default Profile;