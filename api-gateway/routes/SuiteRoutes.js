// SuiteRoutes.js

import express from "express";
import * as SuiteControllers from "../controllers/SuiteControllers.js";

export const router = express.Router();

// Relative to "/oauth2", we append "/suitecrm" to "/oauth2"
router.post("/suitecrm", SuiteControllers.GetBearerToken);
