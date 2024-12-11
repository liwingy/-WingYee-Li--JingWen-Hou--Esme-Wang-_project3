import React from 'react';
import { Container, Typography } from '@mui/material';
import './app.css';

// main page of the application, showing brief introduction
const App = () => {
  return (
    <Container maxWidth="sm" className="app-container">
      <Typography variant="h3" gutterBottom>
        Bluesky Application
      </Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        Share your moments with the world, express your life in your way!
      </Typography>
    </Container>
  );
};

export default App;



