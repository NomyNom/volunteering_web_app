// VolunteerHistory.jsx (frontend)

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './VolunteerHistory.css';

const VolunteerHistory = () => {
  const [volunteerHistory, setVolunteerHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/volunteer/history')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch volunteer history');
        }
        return response.json();
      })
      .then((data) => {
        setVolunteerHistory(data.records);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="history-container">
      {/* Move the back-button-container OUTSIDE the .history-card */}
      <div className="back-button-container">
        <Link to="/admin" className="back-button">
          Back to Admin Dashboard
        </Link>
      </div>

      <div className="page-header">
        <h1 className="page-title">Volunteer Participation History</h1>
        <p className="page-subtitle">
          Track your volunteer activities and statuses.
        </p>
      </div>

      <div className="history-card">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="history-table-container">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Volunteer</th>
                  <th>Event</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {volunteerHistory.map((record) => (
                  <tr key={record._id}>
                    <td>{record.volunteer?.name || record.volunteer || 'N/A'}</td>
                    <td>{record.event?.eventName || record.event || 'N/A'}</td>
                    <td>
                      <span
                        className={`status-badge ${record.participationStatus.toLowerCase()}`}
                      >
                        {record.participationStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerHistory;
