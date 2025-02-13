// src/components/Auth/Register.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css'; // Import the CSS for styling

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', role: 'volunteer' });
  const [error, setError] = useState('');

  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api/auth/register`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(form),
  //     });
  //     const data = await response.json();
  //     if (response.ok) {
  //       navigate('/login');
  //     } else {
  //       setError(data.msg || 'Registration failed');
  //     }
  //   } catch (err) {
  //     console.error('Registration error:', err);
  //     setError('An error occurred during registration');
  //   }
  // };

  const handleRegister = (e) => {
    e.preventDefault();

    // Dummy registration logic: assume registration is always successful
    if (form.email && form.password) {
      // Optionally, you could simulate saving the registration data somewhere
      // For now, simply navigate to the login page
      navigate('/login');
    } else {
      setError("Please fill in all required fields.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        {/* Back button to Home */}
        <div className="back-button-container">
          <Link to="/" className="back-button">Back to Home</Link>
        </div>
        <h2>Register</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Email (Username):</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Role:</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="volunteer">Volunteer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn-primary">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login Here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
