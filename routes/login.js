const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const userModel = require("../schemas/UserSchema");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// Login route
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.cookie("token", token, { httpOnly: true });
    res.json({
      success: "Login successful",
      msg: `after token`,
      username: user.username,
      userId: user._id,
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
