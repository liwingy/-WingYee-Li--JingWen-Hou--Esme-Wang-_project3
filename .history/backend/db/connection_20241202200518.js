const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    console.log(`Connecting to database at: ${process.env.MONGO_URI}`);
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully!');
  } catch (err) {
    console.error('Database connection error:', err.message); // Log error details
    process.exit(1); // Exit if unable to connect
  }
};

module.exports = connectDB;
