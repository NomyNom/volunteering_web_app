// src/components/Admin/Reports.js

import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../App';
import './Reports.css';

const Reports = () => {
  const [format, setFormat] = useState('json');
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleGenerateReport = async () => {
    try {
      let url = 'http://localhost:4000/api/reports';
      if (format !== 'json') url += `?format=${format}`;

      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        throw new Error(errBody.error || errBody.msg || `HTTP ${response.status}`);
      }

      if (format === 'csv' || format === 'pdf') {
        const blob = await response.blob();
        const urlBlob = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = urlBlob;
        link.setAttribute('download', `report.${format}`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setReportData(null);
      } else {
        const data = await response.json();
        setReportData(data);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="home-container">
      {token && (
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </button>

          <nav className="sidebar-links">
            {/* Home Link */}
            <Link
              to="/"
              className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
            >
              <span className="nav-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  viewBox="0 0 24 24">
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      viewBox="0 0 24 24">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </span>
                  <span className="nav-text">Send Notification</span>
                </Link>

                <Link
                  to="/admin/reports"
                  className={`nav-item ${location.pathname === '/admin/reports' ? 'active' : ''}`}
                >
                  <span className="nav-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      viewBox="0 0 24 24">
                      <path d="M17 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
                      <polyline points="7 10 12 15 17 10" />
                    </svg>
                  </span>
                  <span className="nav-text">Reports</span>
                </Link>
              </div>
            )}
          </nav>

          <div className="theme-toggle">
            <button className="theme-btn" onClick={toggleTheme}>
              {theme === 'light' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4.354a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75zM12 19.896a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-1.5 0v-.5a.75.75 0 0 1 .75-.75zM4.354 12a.75.75 0 0 1 .75-.75v-.5a.75.75 0 0 1-1.5 0v.5a.75.75 0 0 1 .75.75zM19.896 12a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75zM6.343 6.343a.75.75 0 0 1 1.061 0l.354.354a.75.75 0 0 1-1.06 1.061l-.354-.354a.75.75 0 0 1 0-1.061zM16.235 16.235a.75.75 0 0 1 1.06 0l.354.354a.75.75 0 1 1-1.06 1.061l-.354-.354a.75.75 0 0 1 0-1.061zM6.343 17.657a.75.75 0 0 1 0 1.06l-.354.354a.75.75 0 1 1-1.06-1.06l.354-.354a.75.75 0 0 1 1.06 0zM16.235 7.765a.75.75 0 0 1 0 1.061l-.354.354a.75.75 0 1 1-1.06-1.06l .354-.354a.75.75 0 0 1 1.06 0zM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79z"/>
                </svg>
              )}
            </button>
          </div>

          <div className="sidebar-logout">
            <button className="logout-btn" onClick={handleLogout}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                viewBox="0 0 24 24">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Logout
            </button>
          </div>
        </div>
      )}

      <div className={`main-content ${token ? 'with-sidebar' : ''}`}>
        <div className="report-container">
          <div className="report-header">
            <h1>Generate Report</h1>
          </div>

          {error && <p className="error">{error}</p>}

          <div className="report-actions">
            <label>Choose Report Format: </label>
            <select value={format} onChange={e => setFormat(e.target.value)}>
              <option value="json">JSON (Preview)</option>
              <option value="csv">CSV (Download)</option>
              <option value="pdf">PDF (Download)</option>
            </select>
            <button onClick={handleGenerateReport}>Generate Report</button>
          </div>

          {format === 'json' && reportData && (
            <pre className="report-preview">
              {JSON.stringify(reportData, null, 2)}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;

