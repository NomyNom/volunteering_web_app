// Home.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css';

const Home = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="home-container">
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
          <div className="navigation-buttons">
            <Link to="/profile" className="nav-button">Profile</Link>
            <Link to="/admin/event" className="nav-button">Event Management</Link>
            <Link to="/admin/matching" className="nav-button">Volunteer Matching</Link>
            <Link to="/admin/history" className="nav-button">Volunteer History</Link>
            <Link to="/notifications" className="nav-button">Notifications</Link>
          </div>
        ) : (
          <p className="access-message">Please login or register to access the features.</p>
        )}
      </main>
    </div>
  );
};

export default Home;
