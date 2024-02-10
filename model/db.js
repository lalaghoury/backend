const mongoose = require("mongoose");
require("dotenv").config();

const db = () => {
  mongoose
    .connect(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.hm1tgtt.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
      console.log("Database connected");
    });
};
module.exports = db;
