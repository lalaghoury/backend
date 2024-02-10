const express = require("express");
const router = express.Router();

// Use a GET request for logout
router.get("/", (req, res) => {
  res.clearCookie("token");
  res.json({ success: "Successfully logged out." });
});

module.exports = router;
