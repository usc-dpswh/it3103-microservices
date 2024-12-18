// HelpRoutes.js

import express from "express";
import { HelpControllers } from "../controllers/HelpControllers.js";

export const router = express.Router();

// Helpdesk routes
router.get("/", HelpControllers.getAllTickets);
router.post("/", HelpControllers.createTicket);
router.get("/:id", HelpControllers.getTicketById);
router.put("/:id", HelpControllers.updateTicket);
router.delete("/:id", HelpControllers.deleteTicket);
