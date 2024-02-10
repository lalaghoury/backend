const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  userimage: {
    type: String,
    default: "https://i.ibb.co/yhrMpQz/s-homepage-recipe-row-user-icon.png",
  },
  userbigimage: {
    type: String,
    default:
      "http://res.cloudinary.com/dslrkvmwn/image/upload/v1707222135/images/sgdqeq8z9fiwpkdiwo54.png",
  },
  recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  blogs: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
