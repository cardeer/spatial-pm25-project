const express = require("express");
const router = express.Router();
const homeModel = require("../models/home_model");

router.get("/", async (req, res) => {
  const data = await homeModel.getAllData("Thailand");

  res.render("index", {
    data: {
      lat: data[0].latitude,
      lon: data[0].longitude,
    },
  });
});

module.exports = router;
