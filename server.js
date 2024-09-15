const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Ride route
app.post('/api/rides', async (req, res) => {
const { pickupLocation, destination } = req.body;

// Handle your logic to save ride details to MongoDB here
// Example:
try {
    const newRide = new Ride({
    pickupLocation,
    destination
    });
    await newRide.save();
    res.status(201).json({ message: 'Ride saved successfully!' });
} catch (err) {
    res.status(500).json({ error: 'Failed to save ride' });
}
});

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://kashyapmistry2021:ws7Gqbfgy3*hQZ5@db1cluster1.skf8r.mongodb.net/?retryWrites=true&w=majority&appName=DB1Cluster1', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// Start the server
const PORT = process.env.PORT || 27017;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
