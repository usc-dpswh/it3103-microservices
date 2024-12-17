// server.js

import express from "express";
import cors from "cors";
import { router as SuiteRoutes } from "./routes/SuiteRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: `Welcome to the API Gateway of Dreams! Port ${PORT}!` });
});

app.use("/suitecrm", SuiteRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
