const express = require('express');
require('dotenv').config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Placeholder routes (will be updated when you start backend tasks)
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
