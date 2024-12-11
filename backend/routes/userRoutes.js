const express = require('express');
const { register, login, searchUsers, updateDescription, getUserDetails } = require('../db/user/userController');
const authMiddleware = require('../middleware/auth'); // Import the authentication middleware

const router = express.Router();

// User-related routes
router.post('/register', authMiddleware, register); // User registration
router.post('/login', authMiddleware, login);       // User login

router.get('/search',authMiddleware, searchUsers); // Search for users
router.put('/updateDescription', authMiddleware, updateDescription); // Update profile description
router.get('/:id', getUserDetails); // Get user details

// Add logout route
router.post('/logout', (req, res) => {
  res.clearCookie('token') // Clear the authentication token
     .status(200)
     .json({ message: 'Logged out successfully' });
});

module.exports = router;
