// SnipeRoutes.js

import express from "express";
import {
  StockControllers,
  StatusLabelControllers,
  UserControllers,
} from "../controllers/SnipeControllers.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js"; // Import the role middleware

export const router = express.Router();

// Stocks Routes
router.get(
  "/hardware",
  authenticateToken,
  authorizeRoles("admin", "user"),
  StockControllers.getAllStocks
);
router.get(
  "/hardware/:id",
  authenticateToken,
  authorizeRoles("admin", "user"),
  StockControllers.getStocksById
);
router.patch(
  "/hardware/:id",
  authenticateToken,
  authorizeRoles("admin"),
  StockControllers.updateItemById
);
router.delete(
  "/hardware/:id",
  authenticateToken,
  authorizeRoles("admin"),
  StockControllers.deleteItemById
);
router.post(
  "/hardware",
  authenticateToken,
  authorizeRoles("admin"),
  StockControllers.createItem
);

// Status Label Routes
router.get(
  "/statuslabels",
  authenticateToken,
  authorizeRoles("admin", "user"),
  StatusLabelControllers.getAllStatusLabels
);
router.get(
  "/statuslabels/:id",
  authenticateToken,
  authorizeRoles("admin", "user"),
  StatusLabelControllers.getStatusLabelById
);
router.patch(
  "/statuslabels/:id",
  authenticateToken,
  authorizeRoles("admin"),
  StatusLabelControllers.updateStatusLabel
);
router.delete(
  "/statuslabels/:id",
  authenticateToken,
  authorizeRoles("admin"),
  StatusLabelControllers.deleteStatusLabelById
);
router.post(
  "/statuslabels",
  authenticateToken,
  authorizeRoles("admin"),
  StatusLabelControllers.createStatusLabel
);

// Users Routers
router.get(
  "/users",
  authenticateToken,
  authorizeRoles("admin"),
  UserControllers.getAllUsers
);
router.get(
  "/users/:id",
  authenticateToken,
  authorizeRoles("admin", "user"),
  UserControllers.getUserById
);
router.post(
  "/users",
  authenticateToken,
  authorizeRoles("admin"),
  UserControllers.createUser
);
router.patch(
  "/users/:id",
  authenticateToken,
  authorizeRoles("admin"),
  UserControllers.updateUserById
);
router.delete(
  "/users/:id",
  authenticateToken,
  authorizeRoles("admin"),
  UserControllers.deleteUserById
);
// Sales Routes (denoted by Quotes)
