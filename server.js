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
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Example API route for rides
app.post('/api/rides', (req, res) => {
  const { destination, pickup } = req.body;

  if (!destination || !pickup) {
    return res.status(400).json({ message: 'Destination and Pickup are required' });
  }

  // Your logic to save the ride to MongoDB
  const ride = new Ride({
    destination,
    pickup,
  });

  ride.save()
    .then((savedRide) => {
      res.status(201).json({
        message: 'Ride saved successfully',
        ride: savedRide,
      });
    })
    .catch((err) => {
      console.error('Error saving ride:', err.message);
      res.status(500).json({ message: 'Error saving ride' });
    });
});

// Root endpoint to confirm server is working
app.get('/', (req, res) => {
  res.send('API is running');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
