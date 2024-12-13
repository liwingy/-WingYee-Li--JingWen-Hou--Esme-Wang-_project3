const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB using environment variable
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Prevent deprecated MongoDB warnings
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1); // Exit if the connection fails
  }
};

module.exports = connectDB;
