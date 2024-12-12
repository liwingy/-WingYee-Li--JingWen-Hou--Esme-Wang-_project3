import React, { useContext } from 'react';
import { GlobalStateContext } from '../utils/GlobalState';
import './NavBar.css';

const NavBar = () => {
  const { isLoggedIn, userInfo, setIsLoggedIn, setUserInfo, handleLogout: globalHandleLogout } = useContext(GlobalStateContext);

  // Local logout functionality
  const localHandleLogout = async () => {
    try {
      const res = await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include', // Ensure cookies are included
      });

      if (res.ok) {
        console.log('Logout successful. Clearing state.');
        globalHandleLogout(); // Call global logout handler
        setIsLoggedIn(false); // Clear login status
        setUserInfo(null); // Clear user info
        window.location.href = '/'; // Redirect to homepage
      } else {
        const errorData = await res.json();
        console.error('Logout failed with response:', errorData);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Handle profile navigation
  const handleProfileClick = () => {
    if (userInfo?.id) {
      console.log('Navigating to profile page for user ID:', userInfo.id);
      window.location.href = `/user/${userInfo.id}`;
    } else {
      console.error('Profile navigation failed. User info is missing:', userInfo);
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
            <button className="navbar-button" onClick={localHandleLogout}>
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