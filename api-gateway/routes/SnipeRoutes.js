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
  "/stocks",
  rateLimitMiddleware,
  authenticateToken,
  authorizeRoles("admin", "user"),
  StockControllers.getAllStocks
);
router.get(
  "/stocks/:id",
  rateLimitMiddleware,
  authenticateToken,
  authorizeRoles("admin", "user"),
  StockControllers.getStocksById
);
router.patch(
  "/stocks/:id",
  rateLimitMiddleware,
  authenticateToken,
  authorizeRoles("admin"),
  StockControllers.updateItemById
);
router.delete(
  "/stocks/:id",
  rateLimitMiddleware,
  authenticateToken,
  authorizeRoles("admin"),
  StockControllers.deleteItemById
);
router.post(
  "/stocks",
  rateLimitMiddleware,
  authenticateToken,
  authorizeRoles("admin"),
  StockControllers.createItem
);

// Status Label Routes
router.get(
  "/statuslabels",
  rateLimitMiddleware,
  authenticateToken,
  authorizeRoles("admin", "user"),
  StatusLabelControllers.getAllStatusLabels
);
router.get(
  "/statuslabels/:id",
  rateLimitMiddleware,
  authenticateToken,
  authorizeRoles("admin", "user"),
  StatusLabelControllers.getStatusLabelById
);
router.patch(
  "/statuslabels/:id",
  rateLimitMiddleware,
  authenticateToken,
  authorizeRoles("admin"),
  StatusLabelControllers.updateStatusLabel
);
router.delete(
  "/statuslabels/:id",
  rateLimitMiddleware,
  authenticateToken,
  authorizeRoles("admin"),
  StatusLabelControllers.deleteStatusLabelById
);
router.post(
  "/statuslabels",
  rateLimitMiddleware,
  authenticateToken,
  authorizeRoles("admin"),
  StatusLabelControllers.createStatusLabel
);

// Users Routers
router.get(
  "/users",
  rateLimitMiddleware,
  authenticateToken,
  authorizeRoles("admin"),
  UserControllers.getAllUsers
);
router.get(
  "/users/:id",
  rateLimitMiddleware,
  authenticateToken,
  authorizeRoles("admin", "user"),
  UserControllers.getUserById
);
router.post(
  "/users",
  rateLimitMiddleware,
  authenticateToken,
  authorizeRoles("admin"),
  UserControllers.createUser
);
router.patch(
  "/users/:id",
  rateLimitMiddleware,
  authenticateToken,
  authorizeRoles("admin"),
  UserControllers.updateUserById
);
router.delete(
  "/users/:id",
  rateLimitMiddleware,
  authenticateToken,
  authorizeRoles("admin"),
  UserControllers.deleteUserById
);
