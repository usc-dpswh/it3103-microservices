// SuiteRoutes.js

import express from "express";
import { SuiteControllers } from "../controllers/SuiteControllers.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { rateLimitMiddleware } from "../middlewares/rateLimitMiddleware.js";

export const router = express.Router();

router.post(
  "/accounts",
  authenticateToken,
  authorizeRoles("admin"),
  rateLimitMiddleware,
  SuiteControllers.createUser
);
router.get(
  "/accounts",
  authenticateToken,
  authorizeRoles("admin"),
  rateLimitMiddleware,
  SuiteControllers.getAllUsers
);
router.get(
  "/accounts/:id",
  authenticateToken,
  authorizeRoles("admin", "user"),
  rateLimitMiddleware,
  SuiteControllers.getUserById
);
router.patch(
  "/accounts",
  authenticateToken,
  authorizeRoles("admin"),
  rateLimitMiddleware,
  SuiteControllers.updateUser
);
router.delete(
  "/accounts",
  authenticateToken,
  authorizeRoles("admin"),
  rateLimitMiddleware,
  SuiteControllers.deleteUser
);

router.post("/oauth2/token", SuiteControllers.getBearerToken);
