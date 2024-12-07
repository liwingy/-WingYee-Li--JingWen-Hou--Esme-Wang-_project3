const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

/**
 * Connect to MongoDB database.
 */
const connectDB = async () => {
    try {
        // Attempt to connect to the database using the connection string from environment variables
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        // Log any errors that occur during connection and exit the process
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB; // Export the connection function for use in other parts of the application
