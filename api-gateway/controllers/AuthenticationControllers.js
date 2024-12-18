// AuthenticationControllers.js

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

// Function to hash a password (useful for initially setting up users)
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Simulated user database
const USERS = [
  {
    id: "1",
    username: "admin",
    role: "admin", // Added role
    password: "$2a$10$LviSDTQLiqvqY4Qr9I66AuorL7aTGZqNUtrHRJVlGV/SPz37Z7bvS", // Hashed password for 'password123'
  },
  {
    id: "2",
    username: "user",
    role: "user", // Added role
    password: "$2a$10$LviSDTQLiqvqY4Qr9I66AuorL7aTGZqNUtrHRJVlGV/SPz37Z7bvS", // Same hashed password for demonstration
  },
];

export const loginUser = async (req, res) => {
  // Check if user is already logged in by verifying existing token
  const existingToken = req.cookies.auth_token;

  if (existingToken) {
    try {
      // Verify the existing token
      const decoded = jwt.verify(existingToken, process.env.JWT_SECRET);
      return res.status(400).json({
        error: "User already logged in",
        username: decoded.username,
      });
    } catch (err) {
      // If token is invalid, continue with login process
      // This clears any invalid existing token
      res.clearCookie("auth_token");
    }
  }

  const { username, password } = req.body;

  try {
    // Find user
    const user = USERS.find((u) => u.username === username);

    if (!user) {
      return res
        .status(401)
        .json({ error: "Authentication failed - User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ error: "Authentication failed - Incorrect password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role }, // Include role in token
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Set cookie with the token
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
      sameSite: "strict",
    });

    res.json({
      message: "Authentication successful",
      userId: user.id,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error during login" });
  }
};

export const logoutUser = (req, res) => {
  // Check if user is already logged out
  const existingToken = req.cookies.auth_token;

  if (!existingToken) {
    return res.status(400).json({ error: "No active user session" });
  }

  // Clear the authentication cookie
  res.clearCookie("auth_token");

  res.json({ message: "Logged out successfully" });
};

// Utility route to help generate new hashed passwords if needed
export const generateHashedPassword = async (req, res) => {
  const { password } = req.body;
  const hashedPassword = await hashPassword(password);
  res.json({ hashedPassword });
};
