const User = require('../models/User');
const Post = require('../models/Post'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register a new user and log them in
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the user
    const user = new User({ username, password: hashedPassword });
    await user.save();

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Set the token as an HTTP-only cookie
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

    console.log('Request Body:', req.body); // Debug input
    const user = await User.findOne({ username });
    console.log('Found User:', user); // Debug user from DB

    if (!user) {
      return res.status(404).json({ error: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password Match:', isMatch); // Debug password comparison

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
       .status(200)
       .json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
};

const isMatch = await bcrypt.compare(password, user.password);
console.log('Plain Password:', password); // Log plain password
console.log('Hashed Password:', user.password); // Log hashed password
console.log('Password Match:', isMatch); // Log comparison result


// Search for users by username
exports.searchUsers = async (req, res) => {
  try {
    const query = req.query.q;

    // Validate input
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    // Perform a case-insensitive, partial search on usernames
    const users = await User.find({
      username: { $regex: query, $options: 'i' },
    }).select('username createdAt'); // Return only username and createdAt fields

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    res.json(users);
  } catch (error) {
    console.error('Error searching users:', error.message);
    res.status(500).json({ error: 'An error occurred while searching users' });
  }
};

// Update user profile description
exports.updateDescription = async (req, res) => {
  try {
    const { description } = req.body;
    const userId = req.user.id; // User ID is extracted from auth middleware

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the description
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

    // Find the user by ID
    const user = await User.findById(userId).select('username createdAt description');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find the posts made by the user
    const posts = await Post.find({ user: userId }).sort({ timestamp: -1 });

    res.json({ user, posts });
  } catch (error) {
    console.error('Error fetching user details:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching user details' });
  }
};
