import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Profile.css";

function ProfileForm() {
  const [fullName, setFullName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [skills, setSkills] = useState([]);
  const [preferences, setPreferences] = useState("");
  const [availability, setAvailability] = useState([]);
  const [dateInput, setDateInput] = useState(""); // Controlled value for date input
  const [errors, setErrors] = useState([]);

  const stateOptions = [ 
    "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
    "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
    "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
    "VA","WA","WV","WI","WY" 
  ];
  const skillOptions = ["Communication", "Leadership", "Computer Skills", "Time Management", "Teamwork"];

  // Add a date from the controlled input
  const handleAddAvailability = () => {
    if (dateInput && !availability.includes(dateInput)) {
      setAvailability([...availability, dateInput]);
      setDateInput(""); // clear the controlled input after adding
    }
  };

  // Remove a selected availability date
  const handleDeleteAvailability = (dateToDelete) => {
    setAvailability(availability.filter(date => date !== dateToDelete));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const missingFields = [];
    if (!fullName.trim()) missingFields.push("Full Name");
    if (!address1.trim()) missingFields.push("Address 1");
    if (!city.trim()) missingFields.push("City");
    if (!state.trim()) missingFields.push("State");
    if (!zip.trim()) missingFields.push("Zip Code");
    if (zip.trim() && zip.trim().length < 5) missingFields.push("Zip Code must be at least 5 characters");
    if (skills.length === 0) missingFields.push("At least one Skill");

    if (missingFields.length > 0) {
      setErrors(missingFields);
      console.log("Missing fields:", missingFields); // Debug output
      return;
    } else {
      setErrors([]);
    }

    const payload = {
      user: JSON.parse(localStorage.getItem("user"))?.id,
      fullName,
      address1,
      address2,
      city,
      state,
      zipCode: zip,
      skills,
      preferences,
      availability,
    };

    try {
      const response = await axios.post("http://localhost:4000/api/profile", payload);
      console.log("Axios response:", response);
      alert(response.data.msg);
    } catch (err) {
      console.error("Axios error:", err.response || err);
      alert(err.response?.data?.msg || "Server error");
    }
  };

  return (
    <div className="profile-container">
      <header className="profile-header">
        <Link to="/" className="home-button">Home</Link>
      </header>
      <h2>User Profile</h2>

      {errors.length > 0 && (
        <div className="error-messages">
          <p>Please fill in the following fields:</p>
          <ul>
            {errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input type="text" maxLength={50} value={fullName} onChange={e => setFullName(e.target.value)} />

        <label>Address 1</label>
        <input type="text" maxLength={100} value={address1} onChange={e => setAddress1(e.target.value)} />

        <label>Address 2</label>
        <input type="text" maxLength={100} value={address2} onChange={e => setAddress2(e.target.value)} />

        <label>City</label>
        <input type="text" maxLength={100} value={city} onChange={e => setCity(e.target.value)} />

        <label>State</label>
        <select value={state} onChange={e => setState(e.target.value)}>
          <option value="">Select State</option>
          {stateOptions.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <label>Zip Code</label>
        <input type="text" maxLength={9} value={zip} onChange={e => setZip(e.target.value)} />

        <label>Skills</label>
        <select multiple value={skills} onChange={e => setSkills(Array.from(e.target.selectedOptions, o => o.value))}>
          {skillOptions.map(skill => (
            <option key={skill} value={skill}>{skill}</option>
          ))}
        </select>

        <label>Preferences</label>
        <textarea value={preferences} onChange={e => setPreferences(e.target.value)} />

        <label>Availability</label>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input
            type="date"
            value={dateInput}
            onChange={e => setDateInput(e.target.value)}
          />
          <button type="button" onClick={handleAddAvailability}>
            Add Date
          </button>
        </div>
        {availability.length > 0 && (
          <ul className="availability-list">
            {availability.map((date, idx) => (
              <li key={idx}>
                {date}{" "}
                <button type="button" onClick={() => handleDeleteAvailability(date)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}

        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}

export default ProfileForm;
