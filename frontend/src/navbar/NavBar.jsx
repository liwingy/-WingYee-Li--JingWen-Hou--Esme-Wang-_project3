import React, { useContext } from 'react';
import { GlobalStateContext } from '../utils/GlobalState';
import './NavBar.css';

const NavBar = () => {
  const { isLoggedIn, userInfo, setIsLoggedIn, setUserInfo, handleLogout: globalHandleLogout } = useContext(GlobalStateContext);

  const localHandleLogout = async () => {
    try {
      const res = await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        globalHandleLogout();
        setIsLoggedIn(false);
        setUserInfo(null);
        window.location.href = '/';
      } else {
        const errorData = await res.json();
        console.error('Logout failed with response:', errorData);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleProfileClick = () => {
    if (userInfo && userInfo?._id) {
      window.location.href = `/user/${userInfo._id}`;
    } else {
      console.error('Profile navigation failed. User info is missing:', userInfo);
    }
  };

  const handleHomeClick = () => {
    if (isLoggedIn) {
      window.location.href = '/home';
    } else {
      window.location.href = '/';
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
            <button className="navbar-button" onClick={handleHomeClick}>
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
            <button className="navbar-button" onClick={handleHomeClick}>
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
