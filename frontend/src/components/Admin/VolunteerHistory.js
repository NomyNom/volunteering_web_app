import React from 'react';
import { Link } from 'react-router-dom';
import './VolunteerHistory.css';

const VolunteerHistory = () => {
  // Dummy data - replace with real data from your backend when ready
  const mockVolunteerHistory = [
    {
      id: 1,
      eventName: "Food Drive 2023",
      eventDescription: "Annual community food collection event",
      location: "City Square",
      requiredSkills: ["Organization", "Teamwork"],
      urgency: "High",
      eventDate: "2023-12-15",
      participationStatus: "Completed"
    },
    {
      id: 2,
      eventName: "Beach Cleanup",
      eventDescription: "Coastal conservation initiative",
      location: "Sunset Beach",
      requiredSkills: ["Physical Labor"],
      urgency: "Medium",
      eventDate: "2024-01-20",
      participationStatus: "Registered"
    }
  ];

  return (
    <div className="history-container">
      <div className="history-card">
        {/* Back button to Admin Dashboard */}
        <div className="back-button-container">
          <Link to="/admin" className="back-button">Back to Admin Dashboard</Link>
        </div>
        
        <h2>Volunteer Participation History</h2>
        
        <div className="history-table-container">
          <table className="history-table">
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Description</th>
                <th>Location</th>
                <th>Required Skills</th>
                <th>Urgency</th>
                <th>Event Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockVolunteerHistory.map((record) => (
                <tr key={record.id}>
                  <td>{record.eventName}</td>
                  <td>{record.eventDescription}</td>
                  <td>{record.location}</td>
                  <td>{record.requiredSkills.join(', ')}</td>
                  <td>{record.urgency}</td>
                  <td>{new Date(record.eventDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge ${record.participationStatus.toLowerCase()}`}>
                      {record.participationStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VolunteerHistory;
