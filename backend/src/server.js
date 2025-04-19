// backend/src/server.js
const express = require('express');
const cors    = require('cors');
const mongoose = require('mongoose');
const dotenv   = require('dotenv');

dotenv.config();
const app = express();

// --- Middleware
app.use(cors());
app.use(express.json());

// --- MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// --- Route Imports
const authRoute             = require('./components/Routes/Auth');
const volunteerHistoryRoute = require('./components/Routes/VolunteerHistory');
const volunteerMatchingRoute= require('./components/Routes/VolunteerMatching');
const eventRoute            = require('./components/Routes/Event');
const reportsRoute          = require('./components/Routes/Reports');

// --- Mount Routes
app.use('/api/auth',                 authRoute);
app.use('/api/volunteer/history',    volunteerHistoryRoute);
app.use('/api/volunteer/matching',   volunteerMatchingRoute);
app.use('/api/events',               eventRoute);
app.use('/api/reports',              reportsRoute);

// --- Health check
app.get('/', (req, res) => res.send('Server is running!!'));

// --- Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
