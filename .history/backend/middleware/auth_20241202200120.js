const jwt = require('jsonwebtoken');

// Middleware to verify user authentication
module.exports = (req, res, next) => {
  const token = req.cookies.token; // Extract token from cookies
  if (!token) return res.status(401).json({ error: 'Unauthorized access' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach user data to the request
    next(); // Proceed to the next middleware/controller
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
