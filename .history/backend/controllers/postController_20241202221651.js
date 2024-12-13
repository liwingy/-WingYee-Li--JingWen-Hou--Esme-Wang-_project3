const Post = require('../models/Post');

// Fetch all posts, sorted by newest first
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'username').sort({ timestamp: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const post = new Post({ user: req.user.id, content }); // Associate post with logged-in user
    await post.save(); // Save post to the database
    res.status(201).json({ message: 'Post created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};

// Edit a post
exports.editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.user.toString() !== userId) {
      return res.status(403).json({ error: 'You are not authorized to edit this post' });
    }

    post.content = content;
    await post.save();

    res.json({ message: 'Post updated successfully', post });
  } catch (error) {
    console.error('Error editing post:', error.message);
    res.status(500).json({ error: 'An error occurred while editing the post' });
  }
};


// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.user.toString() !== userId) {
      return res.status(403).json({ error: 'You are not authorized to delete this post' });
    }

    await post.remove();

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error.message);
    res.status(500).json({ error: 'An error occurred while deleting the post' });
  }
};
