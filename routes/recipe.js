const express = require("express");
const router = express.Router();

// Import the RecipeModel
const RecipeModel = require("../schemas/RecipeSchema");
const userModel = require("../schemas/UserSchema");
const CategoryModel = require("../schemas/CategorySchema");

// POST route to create a new recipe
router.post("/", async (req, res) => {
  const userId = req.body.user;

  try {
    const { user, category, ...recipeData } = req.body;
    const newRecipe = await RecipeModel.create({
      user,
      category,
      ...recipeData,
    });
    await userModel.updateOne(
      { _id: user },
      { $push: { recipes: newRecipe._id } }
    );
    if (category) {
      await CategoryModel.updateOne(
        { _id: category },
        { $push: { recipes: newRecipe._id } }
      );
    }
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// GET route to retrieve all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await RecipeModel.find()
      .populate("user")
      .populate("category")
      .populate("comments");
    res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// GET route to retrieve a single recipe by ID
router.get("/:recipeID", async (req, res) => {
  const { recipeID } = req.params;
  try {
    const recipe = await RecipeModel.findById(recipeID)
      .populate("user")
      .populate("category")
      .populate("comments");
    if (!recipe) {
      return res.status(404).send("Recipe not found");
    }
    res.status(200).json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// PUT route to update a recipe by ID
router.put("/:recipeID", async (req, res) => {
  const { recipeID } = req.params;
  const { user, category, ...updateData } = req.body;

  try {
    const updatedRecipe = await RecipeModel.findByIdAndUpdate(
      recipeID,
      updateData,
      { new: true }
    ).populate("user").populate("category");

    if (!updatedRecipe) {
      return res.status(404).send("Recipe not found");
    }

    if (user) {
      await userModel.findByIdAndUpdate(user, { $addToSet: { recipes: updatedRecipe._id } });
    }

    if (category) {
      await CategoryModel.findByIdAndUpdate(category, { $addToSet: { recipes: updatedRecipe._id } });
    }

    res.status(200).json(updatedRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// DELETE route to delete a recipe by ID
router.delete("/:recipeID", async (req, res) => {
  const { recipeID } = req.params;
  try {
    await RecipeModel.findByIdAndDelete(recipeID);
    res.status(200).send("Recipe deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// //Delete all recipes
// router.delete("/", async (req, res) => {
//   try {
//     await RecipeModel.deleteMany();
//     res.status(200).send("All recipes deleted successfully");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

module.exports = router;
