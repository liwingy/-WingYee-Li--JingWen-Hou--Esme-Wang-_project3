const mongoose = require('mongoose');

/**
 * Schema representing a post created by a user.
 */
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },                  // Title of the post
  content: { type: String, required: true },                // Content of the post
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User who authored the post
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

module.exports = mongoose.model('Post', postSchema); // Export the Post model based on the schema
