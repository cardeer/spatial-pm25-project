import express from "express";
const router = express.Router();

import apiController from "../controllers/api_controller.js";
import homeController from "../controllers/home_controller.js";
import exportController from "../controllers/export_controller.js";
import insertController from "../controllers/insert_controller.js";

// all routes handler
router.use("/api", apiController);
router.use("/", homeController);
router.use("/", exportController);
router.use("/", insertController);

export default router;
