// AuthenticationRoutes.js

import express from "express";
import * as AuthController from "../controllers/AuthenticationControllers.js";
import { rateLimitMiddleware } from "../middlewares/rateLimitMiddleware.js";

export const router = express.Router();

// Authentication routes
router.post("/login", rateLimitMiddleware, AuthController.loginUser);
router.post("/logout", rateLimitMiddleware, AuthController.logoutUser);
router.post(
  "/generate",
  rateLimitMiddleware,
  AuthController.generateHashedPassword
);
