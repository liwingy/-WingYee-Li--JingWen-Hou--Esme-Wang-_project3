const express = require('express');
const { getAllPosts, createPost } = require('../controllers/postController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Routes for fetching and creating posts
router.get('/', getAllPosts);
router.post('/', authMiddleware, createPost);

module.exports = router;
