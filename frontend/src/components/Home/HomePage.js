// Home.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css';

/**
 * This is the Home component, which serves as the landing page of our React App.
 * If a user is logged in (token exists), they'll see navigation links to other pages.
 * Otherwise, they'll see prompts to log in or register.
 */
const Home = () => {
  // Retrieve the token from localStorage to check user authentication
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  /**
   * Logs the user out by removing auth details from localStorage
   * and then redirecting to the /login page.
   */
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="home-container">
      {/* Header area: we only show the Logout button if the user is logged in */}
      <header className="home-header">
        {token && (
          <div className="auth-buttons">
            <button className="btn-secondary" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </header>

      {/* Main content area */}
      <main className="home-main">
        {token ? (
          /**
           * If the user is logged in, show navigation buttons for different admin/user pages.
           */
          <div className="navigation-buttons">
            <Link to="/profile" className="nav-button">
              Profile
            </Link>
            <Link to="/admin/event" className="nav-button">
              Event Management
            </Link>
            <Link to="/admin/matching" className="nav-button">
              Volunteer Matching
            </Link>
            <Link to="/admin/history" className="nav-button">
              Volunteer History
            </Link>
            <Link to="/notifications" className="nav-button">
              Notifications
            </Link>
          </div>
        ) : (
          /**
           * If the user is NOT logged in, show a message and the login/register buttons
           * stacked and centered in the page.
           */
          <>
            <p className="access-message">
              Please login or register to access the features.
            </p>
            <div className="auth-buttons">
              <Link to="/login" className="btn-primary">
                Login
              </Link>
              <Link to="/register" className="btn-secondary">
                Register
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
