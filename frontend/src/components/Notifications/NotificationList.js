// frontend/src/components/Notifications/NotificationList.js
// frontend/src/components/Notifications/NotificationList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NotificationList.css';

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotifications = () => {
    fetch('http://localhost:4000/api/notifications')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }
        return response.json();
      })
      .then(data => {
        setNotifications(data.notifications);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAllAsRead = () => {
    fetch('http://localhost:4000/api/notifications/markAllAsRead', {
      method: 'PUT'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to mark notifications as read');
        }
        return response.json();
      })
      .then(() => {
        fetchNotifications();
      })
      .catch(err => {
        setError(err.message);
      });
  };

  return (
    <div className="notification-page">
      <div className="notification-card">
        <div className="back-button-container">
          <Link to="/" className="back-button">Back to Home</Link>
        </div>
        <div className="notification-header">
          <h2 className="notification-title">Notifications</h2>
          <button className="mark-all-read" onClick={markAllAsRead}>
            Mark All as Read
          </button>
        </div>
        {loading ? (
          <p>Loading notifications...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <table className="notification-table">
            <thead>
              <tr>
                <th>Message</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map(notif => (
                <tr key={notif._id}>
                  <td>{notif.message}</td>
                  <td>{new Date(notif.date).toLocaleDateString()}</td>
                  <td>{notif.read ? 'Read' : 'Unread'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default NotificationList;

