const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const userModel = require("../schemas/UserSchema");

// Signup route
router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      success: "User created successfully",
      email: newUser.email,
      password: newUser.password,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
