import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Register from './pages/Register';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    // url for application home page
    path: '/',
    element: <App />,
  },
  {
    // url for frontend user sign-up
    path: '/register',
    element: <Register />,
  },
  {
    // url for user homepage
    path: '/home',
    element: <Home />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

