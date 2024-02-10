const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema({
  image: { type: String, required: [true, "Blog image is required"] },
  title: { type: String, required: [true, "Blog title is required"] },
  slogan: { type: String, required: [true, "Blog slogan is required"] },
  content: { type: String, required: [true, "Blog content is required"] },
  description: {
    type: String,
    required: [true, "Blog description is required"],
  },
  date: { type: Date, default: Date.now },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User reference is required"],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category reference is required"],
  },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

const BlogModel = mongoose.model("Blog", blogSchema);

module.exports = BlogModel;
