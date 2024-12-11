import React, { useState, useEffect, useContext } from 'react';
import { handleFetchPosts, handlePost } from '../post/PostFeed';
import { GlobalStateContext } from '../utils/GlobalState';
import NavBar from '../navbar/Navbar';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [message, setMessage] = useState('');
  const { isLoggedIn, userInfo } = useContext(GlobalStateContext);

  useEffect(() => {
    if (isLoggedIn) {
      console.log(`Welcome, ${userInfo?.username}`);
      handleFetchPosts(setPosts, setMessage);
    } // 在页面加载时获取帖子列表
  }, [isLoggedIn, userInfo]);

  return (
    <div>
      <NavBar isLoggedIn={true} userName={userInfo?.username} userAvatar={userInfo?.avatarUrl} />
      <div style={{ padding: '1rem' }}>
        <h1>Welcome, {userInfo?.username}!</h1>
        <form
          onSubmit={(e) => handlePost(e, newPost, setMessage, setPosts)} // 发帖后刷新帖子列表
          style={{ marginBottom: '2rem' }}
        >
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Write your status update here..."
            style={{
              width: '100%',
              height: '100px',
              marginBottom: '1rem',
              padding: '0.5rem',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
          <button type="submit" style={{ padding: '0.5rem 1rem' }}>
            Post
          </button>
        </form>
        {message && <p style={{ color: message.includes('success') ? 'green' : 'red' }}>{message}</p>}

        <h2>Your Posts</h2>
          {posts.length === 0 ? ( // 如果没有帖子，显示提示信息
            <p>No posts to display. Start by creating your first post!</p>
          ) : (
            <ul>
              {posts.map((post) => (
                <li
                  key={post.id}
                  style={{
                    marginBottom: '1rem',
                    padding: '1rem',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                  }}
                >
                  <p>{post.content}</p>
                  <small>{new Date(post.timestamp).toLocaleString()}</small>
                </li>
              ))}
            </ul>
          )}
      </div>
    </div>
  );
}
