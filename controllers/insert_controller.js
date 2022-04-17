import express from "express";
const router = express.Router();

router.get("/insert", async (req, res) => {
  res.render("insert");
});

export default router;
