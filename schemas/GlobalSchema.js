// Import the mongoose library
const mongoose = require("mongoose");

// Destructure the Schema object from mongoose
const { Schema } = mongoose;

// Define a Mongoose schema for the 'Global' model
const globalSchema = new Schema({
  // Define your schema fields here
  username: String,
  userimage: {
    type: String,
    default: "https://i.ibb.co/yhrMpQz/s-homepage-recipe-row-user-icon.png",
  },
});

// Create a Mongoose model for the 'Global' schema
const GlobalModel = mongoose.model("Global", globalSchema);

// Export the model for use in other files
module.exports = GlobalModel;
