// handle api routes

import express from "express";
const router = express.Router();
import apiModel from "../models/api_model.js";

import multer from "multer";
const upload = multer();

router.get("/get-all-data", async (req, res) => {
  const data = await apiModel.getAllData(req.query.year);

  return res.json(data);
});

router.get("/5a", async (req, res) => {
  const data = await apiModel.qa(req.query.year);

  return res.json(data);
});

router.get("/5b", async (req, res) => {
  const data = await apiModel.qb();

  return res.json(data);
});

router.get("/5c", async (req, res) => {
  const data = await apiModel.qc();

  return res.json(data);
});

router.get("/5d", async (req, res) => {
  const data = await apiModel.qd();

  return res.json(data);
});

router.get("/5e", async (req, res) => {
  const data = await apiModel.qe();

  return res.json(data);
});

router.get("/5f", async (req, res) => {
  const data = await apiModel.qf(req.query.year);

  return res.json(data);
});

router.get("/4a", async (req, res) => {
  const data = await apiModel.q4a();

  return res.json(data);
});

router.get("/4b", async (req, res) => {
  const data = await apiModel.q4b();

  return res.json(data);
});

router.get("/4c", async (req, res) => {
  const data = await apiModel.q4c(req.query.country);

  return res.json(data);
});

router.get("/4d", async (req, res) => {
  const data = await apiModel.q4d(req.query.year, req.query.color);

  return res.json(data);
});

// create excel file
router.post("/download", (req, res) => {
  const data = req.body.data;
  const id = apiModel.toExcel(JSON.parse(data));

  res.send(id);
});

// download excel file that just created
router.get("/download", (req, res) => {
  res.download(
    `tmp/${req.query.id}.xlsx`,
    `spatial-export-${Date.now().toString()}.xlsx`,
    function () {
      apiModel.removeFile(req.query.id);
    }
  );
});

// insert excel to table
router.post("/add-data", upload.single("file"), async (req, res) => {
  const { ok, msg } = await apiModel.insertToDB(req.file.buffer);

  res.send({
    ok,
    msg,
  });
});

export default router;
