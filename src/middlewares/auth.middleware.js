const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Grab the token from the cookie parser
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized. Please log in.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

module.exports = verifyToken;