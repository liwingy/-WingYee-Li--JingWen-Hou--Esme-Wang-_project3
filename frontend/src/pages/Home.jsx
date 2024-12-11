import React, { useState, useEffect, useContext } from 'react';
import { handleFetchPosts, handlePost } from '../post/PostFeed';
import { GlobalStateContext } from '../utils/GlobalState';
import { TextField, Button, Box } from '@mui/material';
import './Home.css';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [message, setMessage] = useState('');
  const { isLoggedIn, userInfo } = useContext(GlobalStateContext); // shared global user state

  useEffect(() => {
    // fetch user's state
    if (isLoggedIn) {
      console.log(`Welcome, ${userInfo?.username}`);
      handleFetchPosts(setPosts, setMessage);
    }
  }, [isLoggedIn, userInfo]);

  const handleSubmitPost = (event) => {
    event.preventDefault();
    handlePost(newPost, setMessage, setPosts, setNewPost);
  };

  return (
    <div>
      <h1>Welcome, {userInfo?.username || 'Guest'}!</h1>
      <Box component="form" className="form-container" onSubmit={handleSubmitPost}>
        {/* post content input field */}
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
        {/* new post submit button */}
        <Button type="submit" variant="contained" color="primary" className="custom-button">
          Create Post
        </Button>
      </Box>
      {message && <p className={`message ${message.includes('success') ? 'success' : 'error'}`}>{message}</p>}
      {Array.isArray(posts) && posts.length === 0 ? (
        <p>No posts to display. Start by creating your first post!</p>
      ) : (
        Array.isArray(posts) && (
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              <p><strong>{post.username}:</strong> {post.content}</p>
              <small>{new Date(post.timestamp).toLocaleString()}</small>
            </li>
          ))}
        </ul>)
      )}
    </div>
  );
}