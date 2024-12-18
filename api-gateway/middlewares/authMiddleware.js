// authMiddleware.js

import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  // Check for token in cookies
  const token = req.cookies.auth_token;

  // If no token is present
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    // If token is invalid
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }

    // Attach the user information to the request object
    req.user = user;
    next(); // Proceed to the next middleware/route handler
  });
};
