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
    // Hashed password for 'password123'
    password: "$2a$10$LviSDTQLiqvqY4Qr9I66AuorL7aTGZqNUtrHRJVlGV/SPz37Z7bvS",
  },
];

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  console.log("Login attempt:", {
    username,
    providedPassword: password,
  });

  try {
    // Find user
    const user = USERS.find((u) => u.username === username);

    if (!user) {
      console.log("User not found:", username);
      return res
        .status(401)
        .json({ error: "Authentication failed - User not found" });
    }

    // Log the stored hashed password for debugging
    console.log("Stored hashed password:", user.password);

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    console.log("Password comparison result:", isMatch);

    if (!isMatch) {
      return res
        .status(401)
        .json({ error: "Authentication failed - Incorrect password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
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

// Utility route to help generate new hashed passwords if needed
export const generateHashedPassword = async (req, res) => {
  const { password } = req.body;
  const hashedPassword = await hashPassword(password);
  res.json({ hashedPassword });
};
export const logoutUser = (req, res) => {
  // Clear the authentication cookie
  res.clearCookie("auth_token");
  res.json({ message: "Logged out successfully" });
};
