const express = require("express");
const { fetchAndParseF1Store } = require("../services/f1StoreScraper");

const router = express.Router();

router.get("/", async (req, res) => {
  const items = await fetchAndParseF1Store();
  res.json(items);
});

module.exports = router;
