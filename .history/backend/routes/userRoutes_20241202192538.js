const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to authenticate a user and obtain a token
router.post('/login', loginUser);

module.exports = router; // Export the router to be used in the main server file
