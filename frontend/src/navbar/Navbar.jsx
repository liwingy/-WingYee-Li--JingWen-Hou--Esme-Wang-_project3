import React, { useContext } from 'react';
import { GlobalStateContext } from '../utils/GlobalState';
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
    <div className="navbar">
      <div className="navbar-logo" onClick={() => (window.location.href = '/')}>
        Bluesky Application
      </div>
      <div className="navbar-links">
        {isLoggedIn ? (
          <>
            <button className="navbar-button" onClick={() => (window.location.href = '/')}>
              Home
            </button>
            <button className="navbar-button" onClick={handleProfileClick}>
              Profile
            </button>
            <button className="navbar-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="navbar-button" onClick={() => (window.location.href = '/')}>
              Home
            </button>
            <button className="navbar-button" onClick={() => (window.location.href = '/login')}>
              Login
            </button>
            <button className="navbar-button" onClick={() => (window.location.href = '/register')}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;