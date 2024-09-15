const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Ride Schema and Model
const rideSchema = new mongoose.Schema({
pickupLocation: { type: String, required: true },
destination: { type: String, required: true },
createdAt: { type: Date, default: Date.now }
});

const Ride = mongoose.model('Ride', rideSchema);

// POST route to handle new ride requests
app.post('/api/rides', async (req, res) => {
try {
    const { pickupLocation, destination } = req.body;

    if (!pickupLocation || !destination) {
    return res.status(400).json({ error: 'Pickup location and destination are required' });
    }

    const newRide = new Ride({ pickupLocation, destination });
    await newRide.save();

    res.status(201).json({ message: 'Ride saved successfully', ride: newRide });
} catch (error) {
    console.error('Error saving ride:', error);
    res.status(500).json({ error: 'Internal server error' });
}
});

// Root Route
app.get('/', (req, res) => {
res.send('Backend is running!');
});

// Start Server
const PORT = process.env.PORT || 27017;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});
