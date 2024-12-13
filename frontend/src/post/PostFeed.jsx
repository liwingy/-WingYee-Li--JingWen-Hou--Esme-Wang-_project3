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

// delete post
export const handleDeletePost = async (postId, setMessage, setPosts) => {
  try {
    if (!postId) {
      setMessage('Invalid post ID.');
      return;
    }

    const response = await fetch(`${API_URL}/${postId}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    const result = await response.json();
    if (response.ok) {
      setMessage('Post deleted successfully!');
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } else {
      setMessage(result.error || 'Failed to delete post.');
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    setMessage('Network error while deleting post.');
  }
};

// update post
export const handleUpdatePost = async (postId, postContent, setMessage, setPosts) => {
  try {
    const newContent = prompt('Edit your post:', postContent);
    if (newContent === null || !newContent.trim()) {
      setMessage('Post content cannot be empty or unchanged.');
      return;
    }

    const response = await fetch(`${API_URL}/${postId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newContent }),
      credentials: 'include',
    });

    const result = await response.json();
    if (response.ok) {
      setMessage('Post updated successfully!');
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, content: newContent, timestamp: new Date().toISOString() }
            : post
        )
      );
    } else {
      setMessage(result.error || 'Failed to update post.');
    }
  } catch (error) {
    console.error('Error updating post:', error);
    setMessage('Network error while updating post.');
  }
};

