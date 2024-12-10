const mongoose = require('mongoose');

// Post schema definition
const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
  content: { type: String, required: true, maxlength: 280 }, // Post content with max length
  timestamp: { type: Date, default: Date.now }, // Auto-set creation date
});

module.exports = mongoose.model('Post', postSchema);
