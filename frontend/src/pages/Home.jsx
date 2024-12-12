import React, { useState, useEffect, useContext } from 'react';
import { handleFetchPosts, handlePost, handleDeletePost, handleUpdatePost } from '../post/PostFeed';
import { GlobalStateContext } from '../utils/GlobalState';
import { TextField, Button, Box, Card, CardContent, CardActions, Typography } from '@mui/material';
import './Home.css';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [message, setMessage] = useState('');
  const { isLoggedIn, userInfo, handleLogout } = useContext(GlobalStateContext); // Add handleLogout

  useEffect(() => {
    // Fetch all posts for logged-in or logged-out users
    handleFetchPosts(setPosts, setMessage);
  }, []);

  const handleSubmitPost = (event) => {
    event.preventDefault();
    if (isLoggedIn) {
      handlePost(newPost, setMessage, setPosts, setNewPost);
    } else {
      setMessage('You must be logged in to create a post.');
    }
  };

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <h1>Welcome, {userInfo?.username || 'Guest'}!</h1>
        {/* Logout button, shown only for logged-in users */}
        {isLoggedIn && (
          <Button variant="outlined" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Box>
      {/* Display post form only for logged-in users */}
      {isLoggedIn && (
        <Box component="form" className="form-container" onSubmit={handleSubmitPost}>
          {/* Post content input field */}
          <TextField
            label="Write your status update here..."
            multiline
            rows={4}
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="custom-textarea"
            fullWidth
            variant="outlined"
          />
          {/* New post submit button */}
          <Button type="submit" variant="contained" color="primary" className="custom-button">
            Create Post
          </Button>
        </Box>
      )}
      {message && <p className={`message ${message.includes('success') ? 'success' : 'error'}`}>{message}</p>}
      {Array.isArray(posts) && posts.length === 0 ? (
        <p>No posts to display. Start by creating your first post!</p>
      ) : (
        // Show posts
        <Box className="posts-container">
          {posts.map((post) => (
            <Card key={post._id} className="post-card">
              <CardContent>
                <Typography variant="h6">
                  <strong>{post.username}</strong>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {post.content}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {new Date(post.timestamp).toLocaleString()}
                </Typography>
              </CardContent>
              {/* Allow edit and delete only for the logged-in user's own posts */}
              {isLoggedIn && post.username === userInfo?.username && (
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleUpdatePost(post._id, post.content, setMessage, setPosts)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => handleDeletePost(post._id, setMessage, setPosts)}
                  >
                    Delete
                  </Button>
                </CardActions>
              )}
            </Card>
          ))}
        </Box>
      )}
    </div>
  );
}