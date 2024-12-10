const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./db/connection');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Parse JSON
app.use(cookieParser()); // Parse cookies

// Enable CORS for frontend requests
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true,
}));

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', apiLimiter); // Apply rate limiter to all API routes

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Error Handler (must be after routes)
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
