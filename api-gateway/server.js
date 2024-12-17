// Load environment variables from .env file
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import axios from "axios";
import { router as SuiteRoute } from "./routes/SuiteRoutes";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000; // Use PORT from .env or default to 3000

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies if needed

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: `Welcome to the API Gateway of Dreams! Port ${PORT}!` });
});

app.use("/oauth2/suitecrm", SuiteRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
