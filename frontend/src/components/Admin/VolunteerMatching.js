// VolunteerMatching.js
import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../App'; // Import ThemeContext
import './VolunteerMatching.css';

const VolunteerMatching = () => {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { theme, toggleTheme } = useContext(ThemeContext); // Use theme context

  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetch('http://localhost:4000/api/volunteer/matching', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch matching data');
        }
        return response.json();
      })
      .then(data => {
        setMatches(data.matches);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="volunteer-matching-page">
      <div className="with-sidebar-container">
        {token && (
          <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
            <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
              ☰
            </button>
            <nav className="sidebar-links">
              {/* Home link */}
              <Link
                to="/"
                className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
              >
                <span className="nav-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20" height="20"
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
              {/* Admin Pages */}
              {user?.role === 'admin' && (
                <div className="nav-group">
                  <span className="nav-group-title">Admin Pages</span>
                  <Link
                    to="/admin/event"
                    className={`nav-item ${location.pathname === '/admin/event' ? 'active' : ''}`}
                  >
                    <span className="nav-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20" height="20"
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
                    className={`nav-item ${location.pathname === '/admin/matching' ? 'active' : ''}`}
                  >
                    <span className="nav-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20" height="20"
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
                  <Link
                    to="/admin/notifications"
                    className={`nav-item ${location.pathname === '/admin/notifications' ? 'active' : ''}`}
                  >
                    <span className="nav-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20" height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </span>
                    <span className="nav-text">Send Notification</span>
                  </Link>
                </div>
              )}
            </nav>
            {/* Theme toggle placed below nav links */}
            <div className="theme-toggle">
              <button className="theme-btn" onClick={toggleTheme}>
                {theme === "light" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20" height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 4.354a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75zM12 19.896a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-1.5 0v-.5a.75.75 0 0 1 .75-.75zM4.354 12a.75.75 0 0 1 .75-.75v-.5a.75.75 0 0 1-1.5 0v.5a.75.75 0 0 1 .75.75zM19.896 12a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75zM6.343 6.343a.75.75 0 0 1 1.061 0l.354.354a.75.75 0 0 1-1.06 1.061l-.354-.354a.75.75 0 0 1 0-1.061zM16.235 16.235a.75.75 0 0 1 1.06 0l.354.354a.75.75 0 1 1-1.06 1.061l-.354-.354a.75.75 0 0 1 0-1.061zM6.343 17.657a.75.75 0 0 1 0 1.06l-.354.354a.75.75 0 1 1-1.06-1.06l.354-.354a.75.75 0 0 1 1.06 0zM16.235 7.765a.75.75 0 0 1 0 1.061l-.354.354a.75.75 0 1 1-1.06-1.06l.354-.354a.75.75 0 0 1 1.06 0zM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20" height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79z" />
                  </svg>
                )}
              </button>
            </div>
            <div className="sidebar-logout">
              <button className="logout-btn" onClick={handleLogout}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20" height="20"
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
        <div className={`main-content ${token ? 'with-sidebar' : ''}`}>
          <div className="page-header">
            <h1 className="page-title">Volunteer Matching</h1>
          </div>
          <div className="volunteer-matching-container">
            {error && (
              <div style={{ color: 'red', marginBottom: '1rem' }}>
                {error}
              </div>
            )}
            {loading ? (
              <p>Loading matching data...</p>
            ) : matches.length === 0 ? (
              <p>No matching data available.</p>
            ) : (
              <table className="volunteer-matching-table">
                <thead>
                  <tr>
                    <th>Volunteer Name</th>
                    <th>Matched Event</th>
                  </tr>
                </thead>
                <tbody>
                  {matches.map((match) => (
                    <tr key={match._id}>
                      <td>{match.volunteerName}</td>
                      <td>{match.matchedEvent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerMatching;
