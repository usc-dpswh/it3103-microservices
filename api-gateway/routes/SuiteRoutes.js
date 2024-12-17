// SuiteRoutes.js

import express from "express";
import * as SuiteControllers from "../controllers/SuiteControllers.js";

export const router = express.Router();

router.post("/oauth2/token", SuiteControllers.getBearerToken);
router.get("/accounts", SuiteControllers.getAllUsers);
router.get("/accounts/id", SuiteControllers.getUserById);
router.get("/accounts/name", SuiteControllers.getUsersByName);
router.post("/accounts/create", SuiteControllers.createUser);
router.post("/accounts/delete", SuiteControllers.deleteUser);
