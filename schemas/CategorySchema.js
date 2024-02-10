// Import the mongoose library
const mongoose = require("mongoose");

// Destructure the Schema object from mongoose
const { Schema } = mongoose;

// Define a Mongoose schema for the 'Category' model
const categorySchema = new Schema({
  categoryname: String,
  categoryimage: String,
  recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  // user: { type: Schema.Types.ObjectId, ref: "User" },
  blogs: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
});

// Create a Mongoose model for the 'Category' schema
const CategoryModel = mongoose.model("Category", categorySchema);

// Export both models for use in other files
module.exports = CategoryModel;
