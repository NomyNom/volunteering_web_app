// frontend/src/App.jsx

// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProfileForm from './components/Profile/ProfileForm';
import EventForm from './components/Admin/EventForm';
import VolunteerMatching from './components/Admin/VolunteerMatching';
import VolunteerHistory from './components/Admin/VolunteerHistory';
import NotificationList from './components/Notifications/NotificationList';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
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
          path="/admin/history" 
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

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import HomePage from './components/Home/HomePage';
// import Login from './components/Auth/Login';
// import Register from './components/Auth/Register';
// import ProfileForm from './components/Profile/ProfileForm';
// import EventForm from './components/Admin/EventForm';
// import VolunteerMatching from './components/Admin/VolunteerMatching';
// import VolunteerHistory from './components/Admin/VolunteerHistory';
// import NotificationList from './components/Notifications/NotificationList';
// import ProtectedRoute from './components/ProtectedRoute';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/profile" element={<ProfileForm />} />
//         <Route path="/admin/event" element={<EventForm />} />
//         <Route path="/admin/matching" element={<VolunteerMatching />} />
//         <Route path="/admin/history" element={<VolunteerHistory />} />
//         <Route path="/notifications" element={<NotificationList />} />
//         {/* Fallback route */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
