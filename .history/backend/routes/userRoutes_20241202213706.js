const express = require('express');
const {
  register,
  login,
  searchUsers,
  updateDescription,
  getUserDetails,
} = require('../controllers/userController'); // Import all required controllers
const authMiddleware = require('../middleware/auth'); // Import the authentication middleware

const router = express.Router();

// Define routes
router.post('/register', register); // Route for user registration
router.post('/login', login);       // Route for user login

// Search for users
router.get('/search', searchUsers); // Route for searching users by username

// Update user profile description (protected route)
router.put('/updateDescription', authMiddleware, updateDescription);

// Get user details and posts
router.get('/:id', getUserDetails); // Route to fetch user details by ID

module.exports = router;
