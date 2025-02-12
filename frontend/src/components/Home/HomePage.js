import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import the Home page styling

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="home-hero">
        <h1>Welcome to VolunGO</h1>
        <p>Connecting volunteers with events that matter.</p>
        <div className="home-buttons">
          <Link to="/login" className="btn-primary">Login</Link>
          <Link to="/register" className="btn-secondary">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
