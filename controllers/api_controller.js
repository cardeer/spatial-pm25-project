const express = require("express");
const router = express.Router();
const mapModel = require("../models/api_model");

router.get("/get-all-data", async (req, res) => {
  const data = await mapModel.getAllData(req.query.year);

  return res.json(data);
});

router.get("/5a", async (req, res) => {
  const data = await mapModel.qa(req.query.year);

  return res.json(data);
});

router.get("/5b", async (req, res) => {
  const data = await mapModel.qb();

  return res.json(data);
});

router.get("/5c", async (req, res) => {
  const data = await mapModel.qc();

  return res.json(data);
});

router.get("/5d", async (req, res) => {
  const data = await mapModel.qd();

  return res.json(data);
});

router.get("/5e", async (req, res) => {
  const data = await mapModel.qe();

  return res.json(data);
});

router.get("/5f", async (req, res) => {
  const data = await mapModel.qf(req.query.year);

  return res.json(data);
});

module.exports = router;
