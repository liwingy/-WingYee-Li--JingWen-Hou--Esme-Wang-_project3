import React, { createContext, useState, useEffect } from 'react';

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUserInfo(user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserInfo(null);
  };

  // fetch current user info when the app starts
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch('https://wjeproject3.onrender.com/api/users/search', { credentials: 'include' });
        if (response.ok) {
          if (response.ok) {
            const users = await response.json();
            const user = users[0];
            handleLogin(user);
          }
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };
    fetchCurrentUser();
  }, []);

  return (
    <GlobalStateContext.Provider value={{ isLoggedIn, userInfo, handleLogin, handleLogout }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
