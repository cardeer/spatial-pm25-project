const express = require("express");
const router = express.Router();

router.get("/export", async (req, res) => {
  res.render("export");
});

module.exports = router;
