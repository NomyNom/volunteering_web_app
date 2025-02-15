import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './VolunteerHistory.css';

function Notifications() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "New volunteer opportunity: Community Cleanup",
      date: "2024-03-10",
      read: false
    },
    {
      id: 2,
      message: "Your registration for Food Drive was confirmed",
      date: "2024-03-09",
      read: true
    },
    {
      id: 3,
      message: "Reminder: Beach Cleanup starts tomorrow",
      date: "2024-03-08",
      read: false
    },
    {
      id: 4,
      message: "New event: School Supply Drive",
      date: "2024-03-07",
      read: false
    },
    {
      id: 5,
      message: "Your registration for Toy Drive was confirmed",
      date: "2024-03-06",
      read: true
    },
    {
      id: 6,
      message: "Volunteer hours updated for Community Cleanup",
      date: "2024-03-05",
      read: false
    },
    {
      id: 7,
      message: "Thank you for volunteering at Food Drive!",
      date: "2024-03-04",
      read: true
    },
    {
      id: 8,
      message: "Upcoming: Park Restoration Project",
      date: "2024-03-03",
      read: false
    }
  ]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="notification-list-container">
      <button className="notification-bell" onClick={toggleDropdown}>
        {/* Yellow bell icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
          className="bell-icon"
        >
          <path
            fillRule="evenodd"
            d="M10 2a6 6 0 00-6 6v2.586l-.293.293A1 1 0 004
               12h12a1 1 0 00.707-1.707L16 10.586V8a6 6 0
               00-6-6zM9 18a3 3 0 006 0H9z"
            clipRule="evenodd"
          />
        </svg>
        {notifications.some(n => !n.read) && (
          <span className="notification-badge">
            {notifications.filter(n => !n.read).length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="dropdown">
          <div className="dropdown-header">
            <h3>Notifications</h3>
            <button onClick={markAllAsRead} className="mark-read">
              Mark all as read
            </button>
          </div>
          <div className="notification-items">
            {notifications.map(notification => (
              <div
                key={notification.id}
                className={`notification-item ${notification.read ? '' : 'unread'}`}
              >
                <div className="notification-message">{notification.message}</div>
                <div className="notification-date">
                  {new Date(notification.date).toLocaleDateString()}
                </div>
                {!notification.read && <div className="unread-indicator" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}



const VolunteerHistory = () => {
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
      <Notifications />

      {/* New page header outside of the card */}
      <div className="page-header">
        <h1 className="page-title">Volunteer Participation History</h1>
        <p className="page-subtitle">
          Track your volunteer activities, event details, and statuses.
        </p>
      </div>

      <div className="history-card">
        <div className="back-button-container">
          <Link to="/admin" className="back-button">
            Back to Admin Dashboard
          </Link>
        </div>

        {/* Table of volunteer history */}
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
      </div>
    </div>
  );
};

export default VolunteerHistory;









