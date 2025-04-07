// VolunteerHistory.js
import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../App';
import './VolunteerHistory.css';

const VolunteerHistory = () => {
  const [volunteerHistory, setVolunteerHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();
  const navigate = useNavigate();

  // Get the current theme and toggle function from context
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    fetch('http://localhost:4000/api/volunteer/history')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch volunteer history');
        }
        return response.json();
      })
      .then(data => {
        setVolunteerHistory(data.records);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Calculate summary statistics
  const summary = volunteerHistory.reduce(
    (acc, record) => {
      acc.total += 1;
      const status = record.participationStatus.toLowerCase();
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    { total: 0 }
  );

  return (
    <div className="history-container">
      <div className="with-sidebar-container">
        {token && (
          <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
            <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
              ☰
            </button>

            <nav className="sidebar-links">
              <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                <span className="nav-icon">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    viewBox="0 0 24 24">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-14a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </span>
                <span className="nav-text">Home</span>
              </Link>

              {user?.role === 'volunteer' && (
                <div className="nav-group">
                  <span className="nav-group-title">Volunteer Pages</span>
                  <Link to="/profile" className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}>
                    <span className="nav-icon">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        viewBox="0 0 24 24">
                        <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </span>
                    <span className="nav-text">Profile</span>
                  </Link>
                  <Link to="/notifications" className={`nav-item ${location.pathname === '/notifications' ? 'active' : ''}`}>
                    <span className="nav-icon">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        viewBox="0 0 24 24">
                        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                      </svg>
                    </span>
                    <span className="nav-text">Notifications</span>
                  </Link>
                  <Link to="/volunteer/history" className={`nav-item ${location.pathname === '/volunteer/history' ? 'active' : ''}`}>
                    <span className="nav-icon">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
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

              {user?.role === 'admin' && (
                <div className="nav-group">
                  <span className="nav-group-title">Admin Pages</span>
                  <Link to="/admin/event" className={`nav-item ${location.pathname === '/admin/event' ? 'active' : ''}`}>
                    <span className="nav-icon">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
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
                  <Link to="/admin/matching" className={`nav-item ${location.pathname === '/admin/matching' ? 'active' : ''}`}>
                    <span className="nav-icon">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
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
                </div>
              )}

              {/* Theme Toggle Button */}
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

        <div className={`main-content ${token ? 'with-sidebar' : ''}`}>
          <div className="page-header">
            <h1 className="page-title">Volunteer Participation History</h1>
            <p className="page-subtitle">Track your volunteer activities and statuses.</p>
          </div>

          {(!loading && !error && volunteerHistory.length > 0) && (
            <div className="summary-section">
              <div className="summary-item">
                <span>{summary.total}</span>
                <span>Total Events</span>
              </div>
              <div className="summary-item">
                <span>{summary.completed || 0}</span>
                <span>Completed</span>
              </div>
              <div className="summary-item">
                <span>{summary.scheduled || 0}</span>
                <span>Scheduled</span>
              </div>
              <div className="summary-item">
                <span>{summary.cancelled || 0}</span>
                <span>Cancelled</span>
              </div>
            </div>
          )}

          <div className="history-card">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="error-message">{error}</p>
            ) : volunteerHistory.length === 0 ? (
              <p>You have no volunteer history yet.</p>
            ) : (
              <div className="history-table-container">
                <table className="history-table">
                  <thead>
                    <tr>
                      <th>Event</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {volunteerHistory.map(record => (
                      <tr key={record._id}>
                        <td>
                          <svg className="event-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            viewBox="0 0 24 24">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                          </svg>
                          {record.event}
                        </td>
                        <td>
                          <span className={`status-badge ${record.participationStatus.toLowerCase()}`}>
                            {record.participationStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerHistory;


