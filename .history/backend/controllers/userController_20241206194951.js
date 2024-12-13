const User = require('../models/User');
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');

// Register a new user and log them in
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    const user = new User({ username, password: password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
       .status(201)
       .json({ message: 'User registered and logged in successfully' });
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ error: 'An error occurred while registering the user' });
  }
};

// Log in a user
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'Missing username or password' });
    }

    const isMatch = password == user.password;
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
       .status(200)
       .json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
};

// Search for users by username
exports.searchUsers = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const users = await User.find({
      username: { $regex: query, $options: 'i' },
    }).select('username createdAt');

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while searching users' });
  }
};

// Update user profile description
exports.updateDescription = async (req, res) => {
  try {
    const { description } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.description = description;
    await user.save();

    res.json({ message: 'Description updated successfully', description: user.description });
  } catch (error) {
    console.error('Error updating description:', error.message);
    res.status(500).json({ error: 'An error occurred while updating the description' });
  }
};

// Get user details and posts
exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select('username createdAt description');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const posts = await Post.find({ user: userId }).sort({ timestamp: -1 });

    res.json({ user, posts });
  } catch (error) {
    console.error('Error fetching user details:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching user details' });
  }
};

// Logout a user
exports.logout = (req, res) => {
  res.clearCookie('token')
     .status(200)
     .json({ message: 'Logged out successfully' });
};
