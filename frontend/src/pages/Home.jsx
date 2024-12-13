import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { handleFetchPosts, handlePost, handleDeletePost, handleUpdatePost } from '../post/PostFeed';
import { GlobalStateContext } from '../utils/GlobalState';
import './Home.css';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [message, setMessage] = useState('');
  const { isLoggedIn, userInfo, handleLogout } = useContext(GlobalStateContext);

  useEffect(() => {
    // Fetch all posts
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
      <div className="header">
        <h1>Welcome, {userInfo?.username || 'Guest'}!</h1>
        {isLoggedIn && (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
      {isLoggedIn && (
        <form className="form-container" onSubmit={handleSubmitPost}>
          <textarea
            placeholder="Write your status update here..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="custom-textarea"
          />
          <button type="submit" className="custom-button">
            Create Post
          </button>
        </form>
      )}
      {message && <p className={`message ${message.includes('success') ? 'success' : 'error'}`}>{message}</p>}
      {Array.isArray(posts) && posts.length === 0 ? (
        <p>No posts to display. Start by creating your first post!</p>
      ) : (
        <div className="posts-container">
          {posts.map((post) => (
            <div key={post._id} className="post-card">
              {/* Add Link to User Profile */}
              <Link to={`/user/${post.userId}`} className="username-link">
                <strong>{post.username}</strong>
              </Link>
              <p className="post-content">{post.content}</p>
              <span className="post-timestamp">{new Date(post.timestamp).toLocaleString()}</span>
              {isLoggedIn && post.username === userInfo?.username && (
                <div className="post-actions">
                  <button
                    className="edit-button"
                    onClick={() => handleUpdatePost(post._id, post.content, setMessage, setPosts)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeletePost(post._id, setMessage, setPosts)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}