const mongoose = require('mongoose');

/**
 * Schema representing a user in the application.
 */
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // User's unique username
  email: { type: String, required: true, unique: true },    // User's unique email address
  password: { type: String, required: true },               // Hashed password
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

module.exports = mongoose.model('User', userSchema); // Export the User model based on the schema
