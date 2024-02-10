const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the schema for comments
const commentsSchema = new Schema({
  message: { type: String, required: true },
  date: {
    type: String,
    default: () => {
      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.toLocaleString("default", { month: "short" });
      const year = currentDate.getFullYear();
      return `${day} ${month}, ${year}`;
    },
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  blog: { type: Schema.Types.ObjectId, ref: "Blog" },
  parentComment: { type: Schema.Types.ObjectId, ref: "Comment" }, // Reference to the parent comment
  parentReply: { type: Schema.Types.ObjectId, ref: "Comment" }, // Reference to the parent reply
  replies: [{ type: Schema.Types.ObjectId, ref: "Comment" }], // References to reply comments
});

const CommentModel = mongoose.model("Comment", commentsSchema);

module.exports = CommentModel;
