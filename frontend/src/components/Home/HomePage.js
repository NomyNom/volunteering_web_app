// frontend/src/components/Home/HomePage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css';

const Home = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  // Collapsible sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="home-container">
      {/* Render the sidebar ONLY if the user is logged in (token exists) */}
      {token && (
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </button>
          <nav className="sidebar-links">
            {/* Volunteer section */}
            <div className="nav-group">
              <span className="nav-group-title">Volunteer Pages</span>
              <Link to="/profile" className="nav-item">
                <span className="nav-text">Profile</span>
              </Link>
              {/* New: Notifications link */}
              <Link to="/notifications" className="nav-item">
                <span className="nav-text">Notifications</span>
              </Link>
            </div>

            {/* Admin section */}
            <div className="nav-group">
              <span className="nav-group-title">Admin Pages</span>
              <Link to="/admin/event" className="nav-item">
                <span className="nav-text">Event Management</span>
              </Link>
              <Link to="/admin/matching" className="nav-item">
                <span className="nav-text">Volunteer Matching</span>
              </Link>
              <Link to="/admin/history" className="nav-item">
                <span className="nav-text">Volunteer History</span>
              </Link>
            </div>
          </nav>
        </div>
      )}

      {/* Main Content Area */}
      <div className={`main-content ${token ? 'with-sidebar' : ''}`}>
        <header className="home-header">
          {token ? (
            <div className="auth-buttons">
              <button className="btn-secondary" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn-primary">Login</Link>
              <Link to="/register" className="btn-secondary">Register</Link>
            </div>
          )}
        </header>

        <main className="home-main">
          {token ? (
            <h1 className="welcome-message">
            Welcome back, {user?.name || 'User'}! Use the sidebar to navigate.
          </h1>          
          ) : (
            <p className="access-message">
              Please login or register to access the features.
            </p>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;




