import React from 'react';
import { Link } from 'react-router-dom';
import './VolunteerHistory.css';

const VolunteerHistory = () => {
  // Extended dummy data for a more detailed table
  const mockVolunteerHistory = [
    {
      id: 1,
      eventName: "Food Drive 2023",
      eventDescription: "Annual community food collection event to help local shelters.",
      location: "City Square",
      requiredSkills: ["Organization", "Teamwork"],
      urgency: "High",
      eventDate: "2023-12-15",
      participationStatus: "Completed"
    },
    {
      id: 2,
      eventName: "Beach Cleanup",
      eventDescription: "Coastal conservation initiative to remove plastic waste.",
      location: "Sunset Beach",
      requiredSkills: ["Physical Labor"],
      urgency: "Medium",
      eventDate: "2024-01-20",
      participationStatus: "Registered"
    },
    {
      id: 3,
      eventName: "Tree Planting Marathon",
      eventDescription: "Reforestation effort in the city outskirts.",
      location: "Green Acres Park",
      requiredSkills: ["Gardening", "Teamwork"],
      urgency: "High",
      eventDate: "2024-02-05",
      participationStatus: "Completed"
    },
    {
      id: 4,
      eventName: "Animal Shelter Support",
      eventDescription: "Assist with feeding, cleaning, and socializing animals.",
      location: "Happy Tails Shelter",
      requiredSkills: ["Animal Care", "Compassion"],
      urgency: "Medium",
      eventDate: "2024-03-10",
      participationStatus: "Cancelled"
    },
    {
      id: 5,
      eventName: "Marathon Fundraiser",
      eventDescription: "Support staff for a charity run, including handing out water and cheering.",
      location: "Downtown City Loop",
      requiredSkills: ["Teamwork", "Organization"],
      urgency: "High",
      eventDate: "2024-04-15",
      participationStatus: "Waitlist"
    },
    {
      id: 6,
      eventName: "Senior Center Volunteer Day",
      eventDescription: "Engage with seniors through recreational activities and conversation.",
      location: "Evergreen Retirement Home",
      requiredSkills: ["Compassion", "Communication"],
      urgency: "Low",
      eventDate: "2024-05-01",
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


