const express = require('express');
const connectDB = require('./db/connection'); // Ensure the DB connection is correct
const userRoutes = require('./routes/userRoutes'); // Import user routes correctly
const postRoutes = require('./routes/postRoutes'); // Import post routes correctly
require('dotenv').config();

const app = express();

app.use(express.json()); // Middleware to parse JSON

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Connect to the database
connectDB();

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
