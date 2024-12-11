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
      if (result.length === 0) {
        setPosts([]);
      } else {
        const postsList = result.map((post) => ({
          _id: post._id,
          username: post.user?.username || 'Unknown User',
          content: post.content,
          timestamp: new Date(post.timestamp).toLocaleString(),
        }));
        setPosts(postsList);
      }
    } else {
      setMessage(result.error || 'Failed to fetch posts.');
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    setMessage('Network error.');
  }
};

// create new post
export const handlePost = async (newPost, setMessage, setPosts, setNewPost) => {
  try {
    if (!newPost.trim()) {
      setMessage('Post content cannot be empty.');
      return;
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newPost }),
      credentials: 'include',
    });

    const result = await response.json();
    if (response.ok) {
      setMessage('Post created successfully!');
      setPosts((prevPosts) => [
        {
          username: result.post.user?.username || 'Unknown User',
          content: result.post.content,
          timestamp: result.post.timestamp,
          _id: result.post._id,
        },
        ...prevPosts,
      ]);
      setNewPost('');
      await handleFetchPosts(setPosts, setMessage);
    } else {
      setMessage(result.error || 'Failed to create post.');
    }
  } catch (error) {
    console.error('Error creating post:', error);
    setMessage('Network error.');
  }
};

