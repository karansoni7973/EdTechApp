// backend/models/Video.js
const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  price: Number,
});

module.exports = mongoose.model("Video", videoSchema);
