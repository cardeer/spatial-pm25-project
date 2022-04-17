const express = require("express");
const router = express.Router();

router.get("/insert", async (req, res) => {
  res.render("insert");
});

module.exports = router;
