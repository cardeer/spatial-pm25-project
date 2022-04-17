import express from "express";
const router = express.Router();

router.get("/export", async (req, res) => {
  res.render("export");
});

export default router;
