// SnipeRoutes.js

import express from "express";
import {
  HardwareControllers,
  StatusLabelControllers,
} from "../controllers/SnipeControllers.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js"; // Import the role middleware

export const router = express.Router();

// Hardware Routes
router.get(
  "/hardware",
  authenticateToken,
  authorizeRoles("admin", "user"),
  HardwareControllers.getAllHardware
);
router.get(
  "/hardware/:id",
  authenticateToken,
  authorizeRoles("admin", "user"),
  HardwareControllers.getHardwareById
);
router.patch(
  "/hardware/:id",
  authenticateToken,
  authorizeRoles("admin"),
  HardwareControllers.updateHardware
);
router.delete(
  "/hardware/:id",
  authenticateToken,
  authorizeRoles("admin"),
  HardwareControllers.deleteHardwareById
);
router.post(
  "/hardware",
  authenticateToken,
  authorizeRoles("admin"),
  HardwareControllers.createHardware
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
