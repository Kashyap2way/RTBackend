const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 10000; // Use a fixed port number for simplicity

// MongoDB connection string
const MONGODB_URI = 'mongodb+srv://kashyapmistry2021:ws7Gqbfgy3*hQZ5@db1cluster1.skf8r.mongodb.net/?retryWrites=true&w=majority&appName=DB1Cluster1';

// Middleware
app.use(cors({
  origin: 'https://rtapp23.netlify.app' // Replace with your actual frontend URL
}));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define Ride model
const rideSchema = new mongoose.Schema({
  pickup: String,
  destination: String,
  name: String,
  dateTime: String, // Add a new field for date and time
});

const Ride = mongoose.model('Ride', rideSchema);

// Routes
app.post('/api/rides', async (req, res) => {
  try {
    const { pickup, destination, name, dateTime } = req.body;
    if (!pickup || !destination || !name || !dateTime) {
      return res.status(400).json({ message: 'Pickup, destination, name, and date/time are required' });
    }
    const newRide = new Ride({ pickup, destination, name, dateTime });
    await newRide.save();
    res.status(201).json(newRide);
  } catch (error) {
    console.error('Error saving ride:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
