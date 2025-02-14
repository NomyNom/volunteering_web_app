// src/components/Auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; // Import the CSS for styling

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api/auth/login`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(credentials),
  //     });
  //     const data = await response.json();
  //     if (response.ok) {
  //       localStorage.setItem('token', data.token);
  //       localStorage.setItem('user', JSON.stringify(data.user));
  //       navigate('/profile');
  //     } else {
  //       setError(data.msg || 'Login failed');
  //     }
  //   } catch (err) {
  //     console.error('Login error:', err);
  //     setError('An error occurred during login');
  //   }
  // };

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy login logic: In a real app, you'd send an API request.
    // For now, we assume the login is always successful.
    if (credentials.email && credentials.password) {
      // Simulate saving a token and user data in localStorage
      localStorage.setItem('token', 'dummy-token');
      localStorage.setItem('user', JSON.stringify({ email: credentials.email, role: 'volunteer' }));
      
      // Navigate to the profile page
      navigate('/profile');
    } else {
      setError("Please fill in all fields.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Back button to Home */}
        <div className="back-button-container">
          <Link to="/" className="back-button">Back to Home</Link>
        </div>
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn-primary">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register Here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
