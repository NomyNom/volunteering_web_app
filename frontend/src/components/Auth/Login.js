// src/components/Auth/Login.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/api/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        setError(data.msg || 'Login failed');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('userId', data.user._id); // ← This line stores the ObjectId

      navigate('/profile');
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <Link to="/" className="back-button">Back to Home</Link>
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleLogin}>
          <label>Email:</label>
          <input type="email" value={credentials.email} required onChange={e => setCredentials({...credentials, email: e.target.value})}/>
          <label>Password:</label>
          <input type="password" value={credentials.password} required onChange={e => setCredentials({...credentials, password: e.target.value})}/>
          <button type="submit" className="btn-primary">Login</button>
        </form>
        <p>Don't have an account? <Link to="/register">Register Here</Link></p>
      </div>
    </div>
  );
};

export default Login;
