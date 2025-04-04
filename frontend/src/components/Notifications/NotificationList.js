import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './NotificationList.css';

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Fetch notifications
  const fetchNotifications = () => {
    fetch('http://localhost:4000/api/notifications')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }
        return response.json();
      })
      .then((data) => {
        setNotifications(data.notifications);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAllAsRead = () => {
    fetch('http://localhost:4000/api/notifications/markAllAsRead', {
      method: 'PUT'
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to mark notifications as read');
        }
        return response.json();
      })
      .then(() => {
        fetchNotifications();
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="notification-page">
      <div className="with-sidebar-container">
        {token && (
          <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
            <button
              className="toggle-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
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

              {/* Volunteer Pages */}
              {user?.role === 'volunteer' && (
                <div className="nav-group">
                  <span className="nav-group-title">Volunteer Pages</span>
                  <Link
                    to="/profile"
                    className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}
                  >
                    <span className="nav-icon">
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
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </span>
                    <span className="nav-text">Volunteer History</span>
                  </Link>
                </div>
              )}

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
                    className={`nav-item ${location.pathname === '/admin/matching' ? 'active' : ''}`}
                  >
                    <span className="nav-icon">
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

        {/* MAIN CONTENT */}
        <div className={`main-content ${token ? 'with-sidebar' : ''}`}>
          {/* Page header styled like in Volunteer History */}
          <div className="page-header">
            <h1 className="page-title">Notifications</h1>
            <p className="page-subtitle">Stay up-to-date with your alerts</p>
          </div>

          {/* Notification card container */}
          <div className="notification-card">
            <div className="header-actions">
              <button className="mark-all-read" onClick={markAllAsRead}>
                Mark All as Read
              </button>
            </div>

            {loading ? (
              <p>Loading notifications...</p>
            ) : error ? (
              <p className="error">{error}</p>
            ) : (
              <table className="notification-table">
                <thead>
                  <tr>
                    <th>Message</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {notifications.map((notif) => (
                    <tr key={notif._id}>
                      <td>{notif.message}</td>
                      <td>{new Date(notif.date).toLocaleDateString()}</td>
                      <td>{notif.read ? 'Read' : 'Unread'}</td>
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

export default NotificationList;
