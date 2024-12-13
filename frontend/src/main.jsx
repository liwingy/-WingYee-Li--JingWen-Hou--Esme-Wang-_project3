import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile'; 
import NavBar from './navbar/NavBar';
import { GlobalStateProvider } from './utils/GlobalState';

const router = createBrowserRouter([
  {
    path: '/',
    element: 
    <><NavBar /><App /></>,
  },
  {
    path: '/register',
    element: 
    <><NavBar /><Register /></>,
  },
  {
    path: '/login',
    element: 
    <><NavBar /><Login /></>,
  },
  {
    path: '/home',
    element: 
    <><NavBar /><Home /></>,
  },
  {
    path: '/user/:id', // Dynamic route for user profile
    element: 
    <><NavBar /><UserProfile /></>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStateProvider>
      <RouterProvider router={router} />
    </GlobalStateProvider>
  </React.StrictMode>
);