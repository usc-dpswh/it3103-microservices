import express from "express";
import * as AuthController from "../controllers/AuthenticationControllers.js";

export const router = express.Router();

// Authentication routes
router.post("/login", AuthController.loginUser);
router.post("/logout", AuthController.logoutUser);
router.post("/generate", AuthController.generateHashedPassword);
