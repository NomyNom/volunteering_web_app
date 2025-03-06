// frontend/src/components/Notifications/NotificationList.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // <-- Import Link
import './NotificationList.css';

const NotificationList = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New volunteer opportunity: Community Cleanup", date: "2024-03-10", read: false },
    { id: 2, message: "Your registration for Food Drive was confirmed", date: "2024-03-09", read: true },
    { id: 3, message: "Reminder: Beach Cleanup starts tomorrow", date: "2024-03-08", read: false },
    { id: 4, message: "New event: School Supply Drive", date: "2024-03-07", read: false }
  ]);

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
  };

  return (
    <div className="notification-page">
      <div className="notification-card">
        {/* Back Button */}
        <div className="back-button-container">
          <Link to="/" className="back-button">Back to Home</Link>
        </div>

        {/* Header: Title + Mark All as Read */}
        <div className="notification-header">
          <h2 className="notification-title">Notifications</h2>
          <button className="mark-all-read" onClick={markAllAsRead}>
            Mark All as Read
          </button>
        </div>

        {/* Table of Notifications */}
        <table className="notification-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Message</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map(notif => (
              <tr key={notif.id}>
                <td>{notif.id}</td>
                <td>{notif.message}</td>
                <td>{new Date(notif.date).toLocaleDateString()}</td>
                <td>{notif.read ? 'Read' : 'Unread'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotificationList;
