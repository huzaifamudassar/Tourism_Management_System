const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes'); // Import your routes.js
const app = express();

// Middleware
app.use(express.json());

// Database Connection
mongoose
  .connect('mongodb://localhost:27017/tourism')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

// Use Routes
app.use('/api', routes); // All your API routes will be prefixed with /api

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
