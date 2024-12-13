const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./db/connection');

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

require('dotenv').config();

const app = express();
connectDB(); // Connect to MongoDB

// Middleware for parsing JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Route handling
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
