const mongoose = require('mongoose');

// User schema definition
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Unique username
  password: { type: String, required: true }, // Encrypted password
  description: { type: String, default: '' }, // Optional profile description
  joined: { type: Date, default: Date.now }, // Automatically set join date
});

// saving to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); 
  next();
});

module.exports = mongoose.model('User', userSchema);
