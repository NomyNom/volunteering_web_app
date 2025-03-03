// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const authRoutes = require('./components/Routes/Auth');
const profileRoutes = require('./components/Routes/Profile');
const eventRoutes = require('./components/Routes/Event');
const notificationsRoutes = require('./components/Routes/Notifications')
const volunteerHistoryRoutes = require('./components/Routes/VolunteerHistory')
const volunteerMatchingRoutes = require('./components/Routes/VolunteerMatching')

const app = express();
const PORT = process.env.PORT;

// Middleware:
// a concept where functions can be used to process incoming requests before they reach 
// their final destination and handle outgoing responses before they are sent back to the client
app.use(express.json());
app.use(cors());

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI)
//   // .then(() => console.log('MongoDB connected'))
//   .then ( () => {
//     app.listen(PORT, () => {
//       console.log('Connected to MongoDB & Server running on port', PORT, '!')
//     })
//   })
//   .catch(err => console.error('MongoDB connection error:', err));

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/volunteer/history', volunteerHistoryRoutes);
app.use('/api/volunteer/matching', volunteerMatchingRoutes);

// Route
// app.get('/', (req, res) => {
//   res.json({mssg: 'Welcome to the app'})
// })

app.listen(PORT, () => {
  console.log('Server running on port', PORT)
})
