import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import NavBar from './navbar/Navbar';
import { GlobalStateProvider } from './utils/GlobalState';

const router = createBrowserRouter([
  {
    path: '/',
    element: 
    <><NavBar /><App /></>
  },
  {
    path: '/register',
    element: 
    <><NavBar /><Register /></>
  },
  {
    path: '/login',
    element: 
    <><NavBar /><Login /></>
  },
  {
    path: '/home',
    element: 
    <><NavBar /><Home /></>
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStateProvider>
    <RouterProvider router={router} />
    </GlobalStateProvider>
  </React.StrictMode>
);

