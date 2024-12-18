// SnipeRoutes.js

import express from "express";
import {
  StockControllers,
  StatusLabelControllers,
  UserControllers,
} from "../controllers/SnipeControllers.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { rateLimitMiddleware } from "../middlewares/rateLimitMiddleware.js";

export const router = express.Router();

// Stocks Routes
router.get(
  "/hardware",
  authenticateToken,
  authorizeRoles("admin", "user"),
  rateLimitMiddleware,
  StockControllers.getAllStocks
);
router.get(
  "/hardware/:id",
  authenticateToken,
  authorizeRoles("admin", "user"),
  rateLimitMiddleware,
  StockControllers.getStocksById
);
router.patch(
  "/hardware/:id",
  authenticateToken,
  authorizeRoles("admin"),
  rateLimitMiddleware,
  StockControllers.updateItemById
);
router.delete(
  "/hardware/:id",
  authenticateToken,
  authorizeRoles("admin"),
  rateLimitMiddleware,
  StockControllers.deleteItemById
);
router.post(
  "/hardware",
  authenticateToken,
  authorizeRoles("admin"),
  rateLimitMiddleware,
  StockControllers.createItem
);

// Status Label Routes
router.get(
  "/statuslabels",
  authenticateToken,
  authorizeRoles("admin", "user"),
  rateLimitMiddleware,
  StatusLabelControllers.getAllStatusLabels
);
router.get(
  "/statuslabels/:id",
  authenticateToken,
  authorizeRoles("admin", "user"),
  rateLimitMiddleware,
  StatusLabelControllers.getStatusLabelById
);
router.patch(
  "/statuslabels/:id",
  authenticateToken,
  authorizeRoles("admin"),
  rateLimitMiddleware,
  StatusLabelControllers.updateStatusLabel
);
router.delete(
  "/statuslabels/:id",
  authenticateToken,
  authorizeRoles("admin"),
  rateLimitMiddleware,
  StatusLabelControllers.deleteStatusLabelById
);
router.post(
  "/statuslabels",
  authenticateToken,
  authorizeRoles("admin"),
  rateLimitMiddleware,
  StatusLabelControllers.createStatusLabel
);

// Users Routers
router.get(
  "/users",
  authenticateToken,
  authorizeRoles("admin"),
  rateLimitMiddleware,
  UserControllers.getAllUsers
);
router.get(
  "/users/:id",
  authenticateToken,
  authorizeRoles("admin", "user"),
  rateLimitMiddleware,
  UserControllers.getUserById
);
router.post(
  "/users",
  authenticateToken,
  authorizeRoles("admin"),
  rateLimitMiddleware,
  UserControllers.createUser
);
router.patch(
  "/users/:id",
  authenticateToken,
  authorizeRoles("admin"),
  rateLimitMiddleware,
  UserControllers.updateUserById
);
router.delete(
  "/users/:id",
  authenticateToken,
  authorizeRoles("admin"),
  rateLimitMiddleware,
  UserControllers.deleteUserById
);

// Sales Routes (denoted by Quotes)
