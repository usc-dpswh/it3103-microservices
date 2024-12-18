// SnipeRoutes.js

import express from "express";
import {
  HardwareControllers,
  StatusLabelControllers,
} from "../controllers/SnipeControllers.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

export const router = express.Router();

// Hardware Routes
router.get("/hardware", authenticateToken, HardwareControllers.getAllHardware);
router.get(
  "/hardware/:id",
  authenticateToken,
  HardwareControllers.getHardwareById
);

// People Routes

// Status Label Routes
router.get(
  "/statuslabels",
  authenticateToken,
  StatusLabelControllers.getAllStatusLabels
);
router.get(
  "/statuslabels/:id",
  authenticateToken,
  StatusLabelControllers.getStatusLabelById
);
router.patch(
  "/statuslabels/:id",
  authenticateToken,
  StatusLabelControllers.updateStatusLabel
);
router.delete(
  "/statuslabels/:id",
  authenticateToken,
  StatusLabelControllers.deleteStatusLabelById
);
router.post(
  "/statuslabels",
  authenticateToken,
  StatusLabelControllers.createStatusLabel
);
