import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GlobalStateContext } from '../utils/GlobalState';
import './UserProfile.css';

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, userInfo } = useContext(GlobalStateContext);
  const [userDetails, setUserDetails] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  // Fetch user details and posts
  useEffect(() => {
  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`/api/users/${id}`, { credentials: 'include' });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch user details.');
      }

      setUserDetails(data.user);
      setUserPosts(data.posts);
    } catch (error) {
      console.error('Error fetching user details:', error.message);
      setUserDetails(null);
      setUserPosts([]);
    }
  };

  fetchUserDetails();
}, [id]);

  // Delete a post
  const handleDeletePost = async (postId) => {
    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        setUserPosts(userPosts.filter((post) => post._id !== postId));
        alert('Post deleted successfully');
      } else {
        alert('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="user-profile">
      {userDetails ? (
        <>
          <h1>{userDetails.username}</h1>
          <h2>User's Posts</h2>
          <div className="posts-container">
            {userPosts.length ? (
              userPosts.map((post) => (
                <div className="post" key={post._id}>
                  <p className="post-content">{post.content}</p>
                  <span className="post-timestamp">
                    {new Date(post.timestamp).toLocaleString()}
                  </span>
                  {isLoggedIn && userInfo?._id === userDetails._id && (
                    <div className="post-actions">
                      <button
                        className="delete-button"
                        onClick={() => handleDeletePost(post._id)}
                      >
                        Delete
                      </button>
                      <button className="edit-button">Edit</button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No posts available.</p>
            )}
          </div>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
