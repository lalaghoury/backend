const express = require("express");
const router = express.Router();

const BlogModel = require("../schemas/BlogSchema");
const CommentModel = require("../schemas/CommentsSchema");

// Route to get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await BlogModel.find()
      .populate("user")
      .populate("category")
      .populate("comments");
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Route to get a single blog by ID
router.get("/:blogID", async (req, res) => {
  try {
    const blog = await BlogModel.findById(req.params.blogID)
      .populate({
        path: "user",
        select: "username userimage",
      })
      .populate({
        path: "category",
        select: "categoryname",
      })
      .populate({
        path: "comments",
        select: "message date",
        populate: [
          {
            path: "user",
            select: "username userimage",
          },
          {
            path: "replies",
            select: "message date",
            populate: [
              {
                path: "user",
                select: "username userimage",
              },
            ],
          },
        ],
      });
    if (!blog) {
      return res.status(404).send("Blog not found");
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to create a new blog
router.post("/", async (req, res) => {
  try {
    const newBlog = await BlogModel.create(req.body);
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Route to update an existing blog by ID
router.put("/:blogID", async (req, res) => {
  const { blogID } = req.params;
  const { title, slogan, content, description, category, image, user } =
    req.body;

  if (!title || !content || !category) {
    return res.status(400).send("Missing required blog fields");
  }

  try {
    const updatedBlog = await BlogModel.findByIdAndUpdate(
      blogID,
      { title, slogan, content, description, category, image, user },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).send("Blog not found");
    }

    return res.status(200).json(updatedBlog);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    } else {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  }
});

// Route to delete a blog by ID
router.delete("/:blogID", async (req, res) => {
  try {
    const blog = await BlogModel.findByIdAndDelete(req.params.blogID);
    if (!blog) {
      return res.status(404).send("Blog not found");
    }
    res.status(200).send("Blog deleted");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Route to get all comments for a blog
router.get("/:blogID/comments", async (req, res) => {
  try {
    const { blogID } = req.params;
    const comments = await CommentModel.find({ blogID });
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to create a new comment for a blog
router.put("/:blogID/comments", async (req, res) => {
  try {
    const { blogID } = req.params;
    const { message, user } = req.body;
    const newComment = await CommentModel.create({ message, user });
    const blog = await BlogModel.findById(blogID);
    blog.comments.push(newComment._id);
    await blog.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to update an existing comment by ID
router.put("/:blogID/comments/:commentID", async (req, res) => {
  const { blogID, commentID } = req.params;
  const { message } = req.body;
  try {
    const updatedComment = await CommentModel.findByIdAndUpdate(
      commentID,
      { message }, // Replace the existing message with the new one
      { new: true, runValidators: true }
    );
    if (!updatedComment) {
      return res.status(404).send("Comment not found");
    }

    console.debug("Updated Comment:", updatedComment);
    res.status(200).json(updatedComment);
  } catch (error) {
    console.error("Update Comment Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to delete a comment by ID
router.delete("/:blogID/comments/:commentID", async (req, res) => {
  try {
    const { blogID, commentID } = req.params;
    await CommentModel.findByIdAndDelete(commentID);
    const blog = await BlogModel.findById(blogID);
    blog.comments = blog.comments.filter(
      (comment) => comment._id.toString() !== commentID
    );
    await blog.save();
    res.status(200).send("Comment deleted");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to reply to a comment
router.put("/:blogID/comments/:commentID/reply", async (req, res) => {
  try {
    const { blogID, commentID } = req.params;
    const { message, user } = req.body;
    const newReply = await CommentModel.create({ message, user });
    const comment = await CommentModel.findById(commentID);
    comment.replies.push(newReply._id);
    await comment.save();
    res.status(201).json(newReply);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to reply to a reply
router.put(
  "/:blogID/comments/:commentID/replies/:replyID/reply",
  async (req, res) => {
    try {
      const { blogID, commentID, replyID } = req.params;
      const { message, user } = req.body;
      const newReply = await CommentModel.create({ message, user });
      const reply = await CommentModel.findById(replyID);
      reply.replies.push(newReply._id);
      await reply.save();
      res.status(201).json(newReply);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route to delete a reply
router.delete(
  "/:blogID/comments/:commentID/replies/:replyID",
  async (req, res) => {
    try {
      const { blogID, commentID, replyID } = req.params;
      const comment = await CommentModel.findById(commentID);
      if (!comment) {
        return res.status(404).send("Comment not found");
      }
      const replyIndex = comment.replies.findIndex(
        (reply) => reply._id.toString() === replyID
      );
      if (replyIndex === -1) {
        return res.status(404).send("Reply not found");
      }
      comment.replies.splice(replyIndex, 1);
      await comment.save();
      res.status(200).send("Reply deleted");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Additional routes for comments can be added here

module.exports = router;
