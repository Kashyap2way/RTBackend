const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// Connect to MongoDB
mongoose.connect('mongodb+srv://kashyapmistry2021:ws7Gqbfgy3*hQZ5@db1cluster1.skf8r.mongodb.net/?retryWrites=true&w=majority&appName=DB1Cluster1', {
useNewUrlParser: true,
useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Ride schema and model
const rideSchema = new mongoose.Schema({
pickupLocation: String,
destination: String,
createdAt: {
    type: Date,
    default: Date.now
}
});

const Ride = mongoose.model('Ride', rideSchema);

// Route to handle saving ride data
app.post('/api/rides', async (req, res) => {
const { pickupLocation, destination } = req.body;
try {
    const newRide = new Ride({ pickupLocation, destination });
    await newRide.save();
    res.status(201).json({ message: 'Ride saved successfully!' });
} catch (err) {
    res.status(500).json({ error: 'Failed to save ride' });
}
});

app.listen(port, () => {
console.log(`Server running on port ${port}`);
});
