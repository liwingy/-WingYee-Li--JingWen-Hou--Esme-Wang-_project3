const express = require('express');
const { getAllPosts, createPost, editPost, deletePost } = require('../controllers/postController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Routes for fetching and creating posts
router.get('/', getAllPosts);
router.post('/', authMiddleware, createPost);
router.put('/:id', authMiddleware, editPost); // Edit post
router.delete('/:id', authMiddleware, deletePost); // Delete post

module.exports = router;
