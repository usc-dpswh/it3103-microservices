// SuiteRoutes.js

import express from "express";
import { SuiteControllers } from "../controllers/SuiteControllers.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

export const router = express.Router();

router.post(
  "/accounts",
  authenticateToken,
  authorizeRoles("admin"),
  SuiteControllers.createUser
);
router.get(
  "/accounts",
  authenticateToken,
  authorizeRoles("admin"),
  SuiteControllers.getAllUsers
);
router.get(
  "/accounts/:id",
  authenticateToken,
  authorizeRoles("admin", "user"),
  SuiteControllers.getUserById
);
router.patch(
  "/accounts",
  authenticateToken,
  authorizeRoles("admin"),
  SuiteControllers.updateUser
);
router.delete(
  "/accounts",
  authenticateToken,
  authorizeRoles("admin"),
  SuiteControllers.deleteUser
);

router.post("/oauth2/token", SuiteControllers.getBearerToken);
