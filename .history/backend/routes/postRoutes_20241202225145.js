const express = require('express');
const authMiddleware = require('../middleware/auth');
const { getAllPosts, createPost, editPost, deletePost } = require('../controllers/postController');

const router = express.Router();

router.get('/', getAllPosts); // Fetch all posts
router.post('/', authMiddleware, createPost); // Create a post
router.put('/:id', authMiddleware, editPost); // Edit a post
router.delete('/:id', authMiddleware, deletePost); // Delete a post

module.exports = router;
