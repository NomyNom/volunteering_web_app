// SendNotification.js
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './SendNotification.css';

const SendNotification = () => {
  const [message, setMessage] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await fetch('http://localhost:4000/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message, date })
      });
      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Failed to send notification');
      } else {
        const data = await response.json();
        setSuccess(data.msg || 'Notification sent successfully!');
        setMessage('');
        setDate('');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="send-notification-page">
      <div className="with-sidebar-container">
        {token && (
          <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
            <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
              ☰
            </button>
            <nav className="sidebar-links">
              {/* Home Link */}
              <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                <span className="nav-icon">
                  {/* Home icon */}
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
              {/* Admin Links */}
              {user?.role === 'admin' && (
                <div className="nav-group">
                  <span className="nav-group-title">Admin Pages</span>
                  <Link
                    to="/admin/event"
                    className={`nav-item ${location.pathname === '/admin/event' ? 'active' : ''}`}
                  >
                    <span className="nav-icon">
                      {/* Calendar icon */}
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
                      {/* Users icon */}
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
                      {/* Paper plane icon */}
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
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>
                    </span>
                    <span className="nav-text">Send Notification</span>
                  </Link>
                </div>
              )}
            </nav>
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
            <h1 className="page-title">Send Notification</h1>
          </div>

          {/* White card container */}
          <div className="send-notification-container">
            <form onSubmit={handleSubmit} className="notification-form">
              <div className="form-group">
                <label>Message:</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter notification message..."
                  required
                />
              </div>
              <div className="form-group">
                <label>Schedule Date (optional):</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <button type="submit" className="btn-primary">Send Notification</button>
            </form>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendNotification;
