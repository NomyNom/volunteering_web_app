// backend/server.js
const express = require('express');
// const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const cors = require('cors');

dotenv.config();

const authRoutes = require('./components/Routes/Auth');
const profileRoutes = require('./components/Routes/Profile');
const eventRoutes = require('./components/Routes/Event');

const app = express();

// Middleware:
// a concept where functions can be used to process incoming requests before they reach 
// their final destination and handle outgoing responses before they are sent back to the client
app.use(express.json());
// app.use(cors());

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/events', eventRoutes);

// Route
// app.get('/', (req, res) => {
//   res.json({mssg: 'Welcome to the app'})
// })

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log('Server running on port', PORT)
})
