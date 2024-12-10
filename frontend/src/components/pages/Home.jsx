import React, { useState, useEffect } from 'react';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [message, setMessage] = useState('');

  // get user updated state
  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/posts', {
        method: 'GET',
        credentials: 'include',
      });
      const result = await response.json();
      if (response.ok) {
        setPosts(result);
      } else {
        setMessage(result.error || 'Failed to fetch posts.');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // create new post
  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newPost }),
        credentials: 'include',
      });
      const result = await response.json();
      if (response.ok) {
        setMessage('Post created successfully!');
        fetchPosts();
        setNewPost('');
      } else {
        setMessage(result.error || 'Failed to create post.');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Welcome to Your Social Media App!</h1>
      <form onSubmit={handlePost}>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Write your status update here..."
        />
        <button type="submit">Post</button>
      </form>
      {message && <p>{message}</p>}
      <h2>Your Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <p>{post.content}</p>
            <small>{post.timestamp}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
