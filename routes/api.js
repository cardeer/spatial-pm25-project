const express = require("express");
const router = express.Router();

const apiController = require("../controllers/api_controller");

// api routes handler
router.use("/map", apiController);

module.exports = router;
