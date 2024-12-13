const Post = require('../models/Post');

/**
 * Create a new post.
 * @param {Object} req - Express request object containing post details in req.body.
 * @param {Object} res - Express response object.
 */
exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    // Create a new post instance with the provided details and the authenticated user's ID
    const newPost = new Post({ title, content, author: req.user.id });
    // Save the post to the database
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    // Handle errors during post creation
    res.status(400).json({ error: error.message });
  }
};

/**
 * Retrieve all posts.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.getAllPosts = async (req, res) => {
  try {
    // Find all posts and populate the author field with the username
    const posts = await Post.find().populate('author', 'username');
    res.json(posts);
  } catch (error) {
    // Handle errors during retrieval
    res.status(500).json({ error: error.message });
  }
};
