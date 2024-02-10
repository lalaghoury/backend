const express = require("express");
const router = express.Router();

const verifyUser = require("../middlewares/verifyUser");

router.get("/", verifyUser, (req, res) => {
  res.json({ success: "Successfully verified user.", username: req.user.username });
});

module.exports = router;
