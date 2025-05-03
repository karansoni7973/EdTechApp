// backend/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  purchasedVideos: [String],
  isSubscribed: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
