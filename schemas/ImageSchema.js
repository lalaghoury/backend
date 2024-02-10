// Import the mongoose library
const mongoose = require("mongoose");

// Destructure the Schema object from mongoose
const { Schema } = mongoose;

// Define a Mongoose schema for the 'Image' model
const imageSchema = new Schema({
  url: String,
});

// Create a Mongoose model for the 'Recipe' schema
const ImageModel = mongoose.model("image", imageSchema);

module.exports = ImageModel;
