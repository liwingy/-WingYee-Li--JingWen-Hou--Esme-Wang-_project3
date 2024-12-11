import React, { useContext } from 'react';
import { GlobalStateContext } from '../utils/GlobalState';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Avatar } from '@mui/material';

const NavBar = () => {
  const { isLoggedIn, userInfo, handleLogout } = useContext(GlobalStateContext);

  return (
    <AppBar position="static" sx={{ background: '#1976d2' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My Application
        </Typography>
        {isLoggedIn ? (
          <>
            <Typography variant="body1" sx={{ marginRight: 2 }}>
              Welcome, {userInfo?.username}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" href="/login">
              Login
            </Button>
            <Button color="inherit" href="/register">
              Sign Up
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
