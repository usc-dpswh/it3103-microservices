// server.js

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router as SuiteRoutes } from "./routes/SuiteRoutes.js";
import { router as SnipeRoutes } from "./routes/SnipeRoutes.js";
import { router as AuthRoutes } from "./routes/AuthenticationRoutes.js";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const app = express();
const PORT = process.env.GATEWAY_PORT || 3000;

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: `Welcome to the API Gateway of Dreams! Port ${PORT}!`,
  });
});

app.use("/suitecrm", SuiteRoutes);
app.use("/snipeit", SnipeRoutes);
app.use("/auth", AuthRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
