const express = require('express');
const { createPost, getAllPosts } = require('../controllers/postController');
const authMiddleware = require('../middleware/auth'); // Middleware for authentication
const router = express.Router();

// Existing routes
router.post('/', authMiddleware, createPost); // Create a post
router.get('/', getAllPosts);                // Get all posts

// New routes
// Edit a post
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.id; // Extracted from the auth middleware

    // Find the post by ID
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if the logged-in user owns the post
    if (post.user.toString() !== userId) {
      return res.status(403).json({ error: 'You are not authorized to edit this post' });
    }

    // Update the post content
    post.content = content;
    await post.save();

    res.json({ message: 'Post updated successfully', post });
  } catch (error) {
    console.error('Error editing post:', error.message);
    res.status(500).json({ error: 'An error occurred while editing the post' });
  }
});

// Delete a post
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // Extracted from the auth middleware

    // Find the post by ID
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if the logged-in user owns the post
    if (post.user.toString() !== userId) {
      return res.status(403).json({ error: 'You are not authorized to delete this post' });
    }

    // Delete the post
    await post.remove();

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error.message);
    res.status(500).json({ error: 'An error occurred while deleting the post' });
  }
});

module.exports = router;
