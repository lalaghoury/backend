// Import the mongoose library
const mongoose = require("mongoose");

// Destructure the Schema object from mongoose
const { Schema } = mongoose;

// Function to generate random string values
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 50;
}

// Define a Mongoose schema for the 'Recipe' model
const recipeSchema = new Schema({
  recipe_title: String,
  recipe_imageurl: String,
  recipe_description: String,
  recipe_cuisine: String,
  recipe_collection: String,
  recipe_ingredients: [
    {
      ingredient: {
        type: String,
        required: true,
      },
    },
  ],
  recipe_instructions: [
    {
      instruction: {
        type: String,
        required: true,
      },
    },
  ],
  recipe_servings: { type: Number, default: getRandomNumber },
  recipe_cooking_time: { type: Number, default: getRandomNumber },
  recipe_preptime: { type: Number, default: getRandomNumber },
  recipe_calories: { type: Number, default: getRandomNumber },
  recipe_carbohydrates: { type: Number, default: getRandomNumber },
  recipe_proteins: { type: Number, default: getRandomNumber },
  recipe_fats: { type: Number, default: getRandomNumber },
  recipe_net_carbons: { type: Number, default: getRandomNumber },
  recipe_fiber: { type: Number, default: getRandomNumber },
  recipe_sodium: { type: Number, default: getRandomNumber },
  recipe_cholesterol: { type: Number, default: getRandomNumber },

  show_on_recipe_page: {
    type: Boolean,
    default: true,
  },
  firecount: {
    type: Number,
    default: () => Math.floor(Math.random() * 100) + 100,
  },
  recipe_ratings: {
    type: Number,
    default: () => Math.floor(Math.random() * 5) + 1,
  },
  dateField: {
    type: String,
    default: () => {
      const startDate = new Date("2024-01-31");
      const endDate = new Date("2024-01-31");
      const randomDate = new Date(
        startDate.getTime() +
          Math.random() * (endDate.getTime() - startDate.getTime())
      );

      // Format date as "31 Jan, 2024"
      const options = { day: "numeric", month: "short", year: "numeric" };
      const formattedDate = randomDate.toLocaleDateString("en-US", options);
      return formattedDate;
    },
  },
  saves: {
    type: Number,
    default: getRandomNumber,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

// Create a Mongoose model for the 'Recipe' schema
const RecipeModel = mongoose.model("Recipe", recipeSchema);

module.exports = RecipeModel;
