const express = require('express');
const { register, login } = require('../controllers/userController'); 

const router = express.Router();

// Define routes
router.post('/register', register); // Route for user registration
router.post('/login', login);       // Route for user login

module.exports = router;
