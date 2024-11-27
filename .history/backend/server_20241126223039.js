const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connection');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

if (!process.env.DB_URI) {
    console.error('Error: DB_URI is not defined in .env file');
    process.exit(1);
}

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Connect to MongoDB
connectDB();

// Handle unknown routes
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
