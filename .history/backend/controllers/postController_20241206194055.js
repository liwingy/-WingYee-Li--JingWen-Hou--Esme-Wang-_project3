const Post = require('../models/Post');

// Fetch all posts, sorted by newest first
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'username') // Populate 'user' field with username
      .sort({ timestamp: -1 }); // Sort posts by descending timestamp

    if (posts.length === 0) {
      return res.status(404).json({ message: 'No posts available' });
    }

    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching posts' });
  }
};

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;

    // Validate input
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    // Create the post
    const post = new Post({
      user: req.user.id, // Associate post with logged-in user
      content,
      timestamp: new Date(), // Add the current timestamp
    });

    // Save the post to the database
    await post.save();

    res.status(201).json({
      message: 'Post created successfully',
      post,
    });
  } catch (error) {
    console.error('Error creating post:', error.message);
    res.status(500).json({ error: 'An error occurred while creating the post' });
  }
};

// Edit a post
exports.editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.id; // Extract user ID from the auth middleware

    // Validate input
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

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

    res.json({
      message: 'Post updated successfully',
      post,
    });
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

    // Find the post by ID
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if the logged-in user is the owner of the post
    if (post.user.toString() !== userId) {
      return res.status(403).json({ error: 'You are not authorized to delete this post' });
    }

    // Delete the post
    await post.deleteOne();

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error.message);
    res.status(500).json({ error: 'An error occurred while deleting the post' });
  }
};
