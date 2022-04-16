const express = require("express");
const router = express.Router();

const api = require("./api");
const homeController = require("../controllers/home_controller");

router.use("/api", api);
router.use("/", homeController);

module.exports = router;
