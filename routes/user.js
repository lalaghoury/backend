const express = require("express");
const router = express.Router();

const UserModel = require("../schemas/UserSchema");

// User GET all route
router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find().populate("recipes").populate("blogs");
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Single User GET route
router.get("/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id)
      .populate("recipes")
      .populate("categories")
      .populate("blogs")
      .populate("comments");
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Single User POST route
router.post("/", async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Single User PUT route
router.put("/:id", async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Single User DELETE route
router.delete("/:id", async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
