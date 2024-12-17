import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router as SuiteRoutes } from "./routes/SuiteRoutes.js";
import { router as AuthRoutes } from "./routes/AuthenticationRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser()); // Parse cookies
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({ message: `Welcome to the API Gateway of Dreams! Port ${PORT}!` });
});
app.use("/suitecrm", SuiteRoutes);
app.use("/auth", AuthRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
