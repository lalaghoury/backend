const express = require("express");
const router = express.Router();

const { upload } = require("../middlewares/SingleMulter");
const ImageModel = require("../schemas/ImageSchema");
const CloudinaryFunctions = require("../controllers/CloudinaryImageUpload");

// POST route to upload image
router.post("/", upload.single("image"), async (req, res) => {
  const response = await CloudinaryFunctions.upload(req.file.path);
  // Save image to image model in database
  try {
    const image = await ImageModel.create({ url: response.url });
    res.status(201).json(image);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// GET route to retrieve all images
router.get("/", async (req, res) => {
  try {
    const images = await ImageModel.find();
    res.status(200).json(images);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;
