const express = require("express");
const router = express.Router();
const CommentsModel = require("../schemas/CommentsSchema");

// GET route to retrieve all comments
router.get("/", async (req, res) => {
  try {
    const comments = await CommentsModel.find().populate({
      path: "user",
      select: "username userimage",
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// GET route to retrieve a single comment by ID
router.get("/:id", async (req, res) => {
  try {
    const comment = await CommentsModel.findById(req.params.id)
      .populate("user")
      .populate("recipe")
      .populate("blog");
    if (!comment) {
      return res.status(404).send("Comment not found");
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const comment = await CommentsModel.findById(req.params.id);
    if (!comment) {
      return res.status(404).send("Comment not found");
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// POST route to create a new comment
router.post("/", async (req, res) => {
  try {
    const newComment = await CommentsModel.create(req.body);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// PUT route to update an existing comment by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedComment = await CommentsModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).send("Comment not found");
    }
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// DELETE route to delete an existing comment by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedComment = await CommentsModel.findByIdAndDelete(req.params.id);
    if (!deletedComment) {
      return res.status(404).send("Comment not found");
    }
    res.status(200).send("Comment deleted");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// GET route to retrieve all comments for a specific blog by blogId
router.get("/blogs/:blogId/comments", async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const blogWithComments = await BlogModel.findById(blogId)
      .populate({
        path: "comments",
        select: "message date user",
        populate: {
          path: "user",
          select: "username userimage",
        }
      });
    
    if (!blogWithComments) {
      return res.status(404).send("Blog not found");
    }

    res.status(200).json(blogWithComments.comments);
  } catch (error) {
    console.error("Error fetching comments for blog:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
