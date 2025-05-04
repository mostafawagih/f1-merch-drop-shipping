const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    { id: 1, name: "Item One" },
    { id: 2, name: "Item Two" },
  ]);
});

module.exports = router;
