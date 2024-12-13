const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Register a new user.
 * @param {Object} req - Express request object containing user details in req.body.
 * @param {Object} res - Express response object.
 */
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Hash the user's password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user instance with the provided details
    const newUser = new User({ username, email, password: hashedPassword });
    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // Handle errors, such as duplicate entries or validation issues
    res.status(400).json({ error: error.message });
  }
};

/**
 * Authenticate a user and return a JWT token.
 * @param {Object} req - Express request object containing login details in req.body.
 * @param {Object} res - Express response object.
 */
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    // Generate a JWT token valid for 1 hour
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    // Handle errors during authentication
    res.status(500).json({ error: error.message });
  }
};
