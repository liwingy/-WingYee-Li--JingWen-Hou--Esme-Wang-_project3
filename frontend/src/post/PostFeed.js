const API_URL = 'http://localhost:8000/api/posts';

// fetch all posts
export const handleFetchPosts = async (setPosts, setMessage) => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      credentials: 'include',
    });
    const result = await response.json();
    if (response.ok) {
      const postsList = result.map((post) => ({
        username: post.user.username || 'Unknown User', // 提取用户名
        content: post.content, // 提取帖子内容
        timestamp: new Date(post.timestamp).toLocaleString(), // 格式化时间
      }));
      setPosts(postsList);
    } else {
      setMessage(data.error || 'Failed to fetch posts.');
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    setMessage('Network error.');
  }
};

// create new post
export const handlePost = async (newPost, setPosts, setMessage) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newPost }),
      credentials: 'include',
    });

    const result = await response.json();
    if (response.ok) {
      setMessage('Post created successfully!');
      setPosts((prevPosts) => [result.post, ...prevPosts]);
    } else {
      setMessage(result.error || 'Failed to create post.');
    }
  } catch (error) {
    console.error('Error creating post:', error);
    setMessage('Network error.');
  }
};

