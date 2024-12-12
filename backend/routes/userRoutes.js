const express = require('express');
const { register, login, searchUsers, updateDescription, getUserDetails } = require('../db/user/userController');
const authMiddleware = require('../middleware/auth'); // Import the authentication middleware

const router = express.Router();

// User-related routes
router.post('/register', register); // User registration
router.post('/login', login);       // User login

router.get('/search',authMiddleware, searchUsers); // Search for users
router.put('/updateDescription', authMiddleware, updateDescription); // Update profile description
router.get('/:id', authMiddleware, (req, res, next) => {
  // Check if the `id` is "me" and replace it with the current user's ID
  if (req.params.id === 'me') {
    req.params.id = req.user.id; // `req.user` is set by `authMiddleware`
  }
  next(); // Pass control to the `getUserDetails` controller
}, getUserDetails);

// Add logout route
router.post('/logout', (req, res) => {
  res.clearCookie('token') // Clear the authentication token
     .status(200)
     .json({ message: 'Logged out successfully' });
});

module.exports = router;
