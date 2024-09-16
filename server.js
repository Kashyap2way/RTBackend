const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 10000;

// Middleware
app.use(express.json()); // To parse JSON data

// CORS middleware - allow requests only from your Netlify frontend
app.use(cors({
  origin: 'https://rtapp23.netlify.app'  // Replace with your actual Netlify frontend URL
}));

// MongoDB connection string (replace with your MongoDB Atlas URI)
const mongoURI = "mongodb+srv://kashyapmistry2021:ws7Gqbfgy3*hQZ5@db1cluster1.skf8r.mongodb.net/?retryWrites=true&w=majority&appName=DB1Cluster1";

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Define the Ride schema and model
const rideSchema = new mongoose.Schema({
  destination: String,
  pickup: String,
  time: {
    type: Date,
    default: Date.now,
  },
});

// Create the Ride model
const Ride = mongoose.model('Ride', rideSchema);

// POST route to handle creating a new ride
app.post('/api/rides', async (req, res) => {
  try {
    const newRide = new Ride({
      destination: req.body.destination,
      pickup: req.body.pickup,
    });
    await newRide.save();  // Save the new ride to the database
    res.status(201).send(newRide);  // Respond with the newly created ride
  } catch (err) {
    console.error('Error saving ride:', err);
    res.status(500).send('Error saving ride');  // Internal Server Error
  }
});

// Health check route to ensure the server is working
app.get('/', (req, res) => {
  res.send('Server is running and connected to MongoDB');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
