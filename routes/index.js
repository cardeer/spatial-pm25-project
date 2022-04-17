const express = require("express");
const router = express.Router();

const api = require("./api");
const homeController = require("../controllers/home_controller");
const exportController = require("../controllers/export_controller");
const insertController = require("../controllers/insert_controller");

// all routes handler
router.use("/api", api);
router.use("/", homeController);
router.use("/", exportController);
router.use("/", insertController);

module.exports = router;
