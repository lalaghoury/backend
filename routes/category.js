const express = require("express");
const router = express.Router();

const CategoryModel = require("../schemas/CategorySchema");

router.get("/", async (req, res) => {
  try {
    const categories = await CategoryModel.find()
      .populate("recipes")
      .populate("blogs");
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    const newCategory = await CategoryModel.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:categoryID", async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.categoryID)
      .populate("blogs")
      .populate({
        path: "recipes",
        populate: {
          path: "user",
          select: "username userimage", 
        },
      })
      .exec();

    if (!category) {
      return res.status(404).send("Category not found");
    }
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/:categoryID", async (req, res) => {
  try {
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      req.params.categoryID,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/:categoryID", async (req, res) => {
  try {
    const deletedCategory = await CategoryModel.findByIdAndDelete(
      req.params.categoryID
    );
    if (!deletedCategory) {
      return res.status(404).send("Category not found");
    }
    res.status(200).json(deletedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
