import React, { useContext } from 'react';
import { GlobalStateContext } from '../utils/GlobalState';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import './NavBar.css';

const NavBar = () => {
  const { isLoggedIn, userInfo, setIsLoggedIn, setUserInfo } = useContext(GlobalStateContext);

  // Handle logout functionality
  const handleLogout = async () => {
    try {
      const res = await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include', // Ensure cookies are included
      });

      if (res.ok) {
        setIsLoggedIn(false); // Update global state
        setUserInfo(null); // Clear user info
        window.location.href = '/'; // Redirect to the homepage
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleProfileClick = () => {
    if (userInfo?.id) {
      window.location.href = `/user/${userInfo.id}`;
    } else {
      console.error('User ID is undefined');
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Application name linked to the home page */}
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => (window.location.href = '/')}
        >
          Bluesky Application
        </Typography>

        {/* Dynamic navigation buttons based on user login state */}
        {isLoggedIn ? (
          <Box display="flex" alignItems="center">
            {/* Home button */}
            <Button color="inherit" onClick={() => (window.location.href = '/')}>
              Home
            </Button>
            {/* Link to the user's profile page */}
            <Button color="inherit" onClick={handleProfileClick}>
              Profile
            </Button>
            {/* Logout button */}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Box>
            {/* Home button */}
            <Button color="inherit" onClick={() => (window.location.href = '/')}>
              Home
            </Button>
            {/* Login button */}
            <Button color="inherit" href="/login">
              Login
            </Button>
            {/* Sign Up button */}
            <Button color="inherit" href="/register">
              Sign Up
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;