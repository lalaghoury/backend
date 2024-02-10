const cloudinary = require("cloudinary").v2;
const cloudinaryConfig = require("../model/cloudinary");
const { unlink } = require("../model/fs");

const CloudinaryFunctions = {
  upload: async function (path) {
    const response = await cloudinary.uploader.upload(
      path,
      { folder: "images" },
      (error) => {
        if (error) {
          console.error(error);
        }
      }
    );
    unlink(path);
    return response;
  },
};

module.exports = CloudinaryFunctions;
