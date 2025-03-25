// frontend/src/components/Admin/VolunteerMatching.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './VolunteerMatching.css';

const VolunteerMatching = () => {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the volunteer matching records from the backend
    fetch('http://localhost:4000/api/volunteer/matching', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
        // Include Authorization header if needed:
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch matching data');
        }
        return response.json();
      })
      .then((data) => {
        setMatches(data.matches);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="volunteer-matching-page">
      <div className="volunteer-matching-container">
        <div className="back-button-container">
          <Link to="/" className="back-button">Back to Home</Link>
        </div>
        <h2>Volunteer Matching</h2>
        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        {loading ? (
          <p>Loading matching data...</p>
        ) : matches.length === 0 ? (
          <p>No matching data available.</p>
        ) : (
          <table className="volunteer-matching-table">
            <thead>
              <tr>
                <th>Volunteer Name</th>
                <th>Matched Event</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match) => (
                <tr key={match._id}>
                  <td>{match.volunteerName}</td>
                  <td>{match.matchedEvent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default VolunteerMatching;
