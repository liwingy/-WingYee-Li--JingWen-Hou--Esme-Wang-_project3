const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Define the POST route
app.post('/api/users/register', (req, res) => {
  // Your registration logic here
  res.send('User registered successfully');
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  