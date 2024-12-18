import express from "express";
import { SuiteControllers } from "../controllers/SuiteControllers.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

export const router = express.Router();

// Protected routes - require authentication
router.post("/accounts", authenticateToken, SuiteControllers.createUser);
router.get("/accounts", authenticateToken, SuiteControllers.getAllUsers);
router.get("/accounts/:id", authenticateToken, SuiteControllers.getUserById);
router.patch("/accounts", authenticateToken, SuiteControllers.updateUser);
router.delete("/accounts", authenticateToken, SuiteControllers.deleteUser);

// OAuth2 token route remains public
router.post("/oauth2/token", SuiteControllers.getBearerToken);
