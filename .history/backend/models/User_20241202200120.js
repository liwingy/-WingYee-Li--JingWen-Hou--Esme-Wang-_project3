const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User schema definition
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Unique username
  password: { type: String, required: true }, // Encrypted password
  description: { type: String, default: '' }, // Optional profile description
  joined: { type: Date, default: Date.now }, // Automatically set join date
});

// Hash the password before saving to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if the password is new/changed
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);
