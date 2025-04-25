// /frontend/src/App.js
import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProfileForm from './components/Profile/ProfileForm';
import EventForm from './components/Admin/EventForm';
import VolunteerMatching from './components/Admin/VolunteerMatching';
import VolunteerHistory from './components/Admin/VolunteerHistory';
import NotificationList from './components/Notifications/NotificationList';
import SendNotification from './components/Admin/SendNotification';
import Reports from './components/Admin/Reports'; // Import the Reports component
import ProtectedRoute from './components/ProtectedRoute';

export const ThemeContext = createContext();

function AppContent() {
  const [theme, setTheme] = useState('light');
  const location = useLocation();

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    document.body.className = token ? theme : "";
  }, [theme, location]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfileForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/event"
          element={
            <ProtectedRoute>
              <EventForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/matching"
          element={
            <ProtectedRoute>
              <VolunteerMatching />
            </ProtectedRoute>
          }
        />
        <Route
          path="/volunteer/history"
          element={
            <ProtectedRoute>
              <VolunteerHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/notifications"
          element={
            <ProtectedRoute>
              <SendNotification />
            </ProtectedRoute>
          }
        />
        {/* New Reports Route */}
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeContext.Provider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
