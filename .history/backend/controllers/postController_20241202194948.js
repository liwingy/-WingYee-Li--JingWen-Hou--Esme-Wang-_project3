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
