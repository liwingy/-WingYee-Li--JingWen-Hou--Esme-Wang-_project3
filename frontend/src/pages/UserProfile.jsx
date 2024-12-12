import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GlobalStateContext } from '../utils/GlobalState';
import { Box, Typography, TextField, Button, Card, CardContent } from '@mui/material';

export default function UserProfile() {
  const { id } = useParams(); // Get the user ID from URL
  const { isLoggedIn, userInfo, handleLogout } = useContext(GlobalStateContext);
  const [userDetails, setUserDetails] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  // Fetch user details and posts
  useEffect(() => {
    // Redirect to home if not logged in
    if (!isLoggedIn) {
      navigate('/');
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const res = await fetch(`/api/users/${id}`); // Use `id` from useParams
        const data = await res.json();
        setUserDetails(data.user);
        setUserPosts(data.posts);
        setDescription(data.user.description || '');
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [isLoggedIn, id, navigate]); // Dependency array updated with `id`

  // Handle description update
  const handleUpdateDescription = async () => {
    try {
      const res = await fetch(`/api/users/updateDescription`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Description updated successfully');
      } else {
        alert(data.error || 'Failed to update description');
      }
    } catch (error) {
      console.error('Error updating description:', error);
    }
  };

  return (
    <Box padding={3}>
      {userDetails ? (
        <>
          <Typography variant="h4">{userDetails.username}</Typography>
          <Typography variant="subtitle1">
            Joined: {new Date(userDetails.joined).toLocaleDateString()}
          </Typography>
          {/* Show description field for the logged-in user */}
          {isLoggedIn && userInfo?.id === userDetails.id ? (
            <>
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                multiline
                margin="normal"
              />
              <Button variant="contained" color="primary" onClick={handleUpdateDescription}>
                Update Description
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleLogout}
                style={{ marginLeft: '10px' }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Typography variant="body1">{userDetails.description || 'No description provided.'}</Typography>
          )}

          <Typography variant="h5" marginTop={3}>
            Posts
          </Typography>
          <Box marginTop={2}>
            {userPosts.map((post) => (
              <Card key={post._id} style={{ marginBottom: '10px' }}>
                <CardContent>
                  <Typography variant="body1">{post.content}</Typography>
                  <Typography variant="caption">
                    {new Date(post.timestamp).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
}