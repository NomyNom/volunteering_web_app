// ProfileForm.js
import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../../App";
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
  const [dateInput, setDateInput] = useState("");
  const [errors, setErrors] = useState([]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const navigate = useNavigate();

  // Theme context for toggling the theme on this page
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const stateOptions = [
    "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
    "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
    "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
    "VA","WA","WV","WI","WY"
  ];
  const skillOptions = [
    "Communication",
    "Leadership",
    "Computer Skills",
    "Time Management",
    "Teamwork"
  ];

  const handleAddAvailability = () => {
    if (dateInput && !availability.includes(dateInput)) {
      setAvailability([...availability, dateInput]);
      setDateInput("");
    }
  };

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
    if (zip.trim() && zip.trim().length < 5) {
      missingFields.push("Zip Code must be at least 5 characters");
    }
    if (skills.length === 0) {
      missingFields.push("At least one Skill");
    }

    if (missingFields.length > 0) {
      setErrors(missingFields);
      return;
    } else {
      setErrors([]);
    }

    const payload = {
      user: user?.id,
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
      alert(response.data.msg);
    } catch (err) {
      alert(err.response?.data?.msg || "Server error");
    }
  };

  return (
    <div className="profile-page">
      <div className="with-sidebar-container">
        {/* SIDEBAR */}
        {token && (
          <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
            <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
              ☰
            </button>

            <nav className="sidebar-links">
              <Link
                to="/"
                className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
              >
                <span className="nav-icon">
                  {/* Home icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    viewBox="0 0 24 24">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-14a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </span>
                <span className="nav-text">Home</span>
              </Link>

              {user?.role === "volunteer" && (
                <div className="nav-group">
                  <span className="nav-group-title">Volunteer Pages</span>
                  <Link
                    to="/profile"
                    className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}
                  >
                    <span className="nav-icon">
                      {/* User icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        viewBox="0 0 24 24">
                        <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </span>
                    <span className="nav-text">Profile</span>
                  </Link>
                  <Link
                    to="/notifications"
                    className={`nav-item ${location.pathname === '/notifications' ? 'active' : ''}`}
                  >
                    <span className="nav-icon">
                      {/* Bell icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        viewBox="0 0 24 24">
                        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                      </svg>
                    </span>
                    <span className="nav-text">Notifications</span>
                  </Link>
                  <Link
                    to="/volunteer/history"
                    className={`nav-item ${location.pathname === '/volunteer/history' ? 'active' : ''}`}
                  >
                    <span className="nav-icon">
                      {/* Clock icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </span>
                    <span className="nav-text">Volunteer History</span>
                  </Link>
                </div>
              )}

              {user?.role === "admin" && (
                <div className="nav-group">
                  <span className="nav-group-title">Admin Pages</span>
                  <Link
                    to="/admin/event"
                    className={`nav-item ${location.pathname === '/admin/event' ? 'active' : ''}`}
                  >
                    <span className="nav-icon">
                      {/* Calendar icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        viewBox="0 0 24 24">
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
                    className={`nav-item ${location.pathname === '/admin/matching' ? 'active' : ''}`}
                  >
                    <span className="nav-icon">
                      {/* Users icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        viewBox="0 0 24 24">
                        <path d="M17 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M7 21v-2a4 4 0 0 1 3-3.87" />
                        <circle cx="12" cy="7" r="4" />
                        <line x1="5.4" y1="19" x2="18.6" y2="19" />
                      </svg>
                    </span>
                    <span className="nav-text">Volunteer Matching</span>
                  </Link>
                  <Link
                    to="/admin/notifications"
                    className={`nav-item ${location.pathname === '/admin/notifications' ? 'active' : ''}`}
                  >
                    <span className="nav-icon">
                      {/* Paper plane icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        viewBox="0 0 24 24">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </span>
                    <span className="nav-text">Send Notification</span>
                  </Link>
                </div>
              )}

              {/* Theme Toggle Button on Profile Page Sidebar */}
              <div className="theme-toggle">
                <button className="theme-btn" onClick={toggleTheme}>
                  {theme === 'light' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 4.354a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75zM12 19.896a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-1.5 0v-.5a.75.75 0 0 1 .75-.75zM4.354 12a.75.75 0 0 1 .75-.75v-.5a.75.75 0 0 1-1.5 0v.5a.75.75 0 0 1 .75.75zM19.896 12a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75zM6.343 6.343a.75.75 0 0 1 1.061 0l.354.354a.75.75 0 0 1-1.06 1.061l-.354-.354a.75.75 0 0 1 0-1.061zM16.235 16.235a.75.75 0 0 1 1.06 0l.354.354a.75.75 0 1 1-1.06 1.061l-.354-.354a.75.75 0 0 1 0-1.061zM6.343 17.657a.75.75 0 0 1 0 1.06l-.354.354a.75.75 0 1 1-1.06-1.06l.354-.354a.75.75 0 0 1 1.06 0zM16.235 7.765a.75.75 0 0 1 0 1.061l-.354.354a.75.75 0 1 1-1.06-1.06l.354-.354a.75.75 0 0 1 1.06 0zM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79z"/>
                    </svg>
                  )}
                </button>
              </div>
            </nav>

            <div className="sidebar-logout">
              <button className="logout-btn" onClick={handleLogout}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="logout-icon">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        )}

        {/* MAIN CONTENT */}
        <div className="main-content">
          <div className="page-header">
            <h1 className="page-title">User Profile</h1>
            <p className="page-subtitle">Manage your volunteer details</p>
          </div>

          <div className="profile-container">
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
                <input type="date" value={dateInput} onChange={e => setDateInput(e.target.value)} />
                <button type="button" onClick={handleAddAvailability}>Add Date</button>
              </div>
              {availability.length > 0 && (
                <ul className="availability-list">
                  {availability.map((date, idx) => (
                    <li key={idx}>
                      {date}{" "}
                      <button type="button" onClick={() => handleDeleteAvailability(date)}>Delete</button>
                    </li>
                  ))}
                </ul>
              )}

              <button type="submit">Save Profile</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;
