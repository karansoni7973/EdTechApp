const User = require("../models/User.js");
const Video = require("../models/Video.js");

exports.getAllVideos = async (req, res) => {
  const videos = await Video.find();
  res.json(videos);
};

exports.purchaseVideo = async (req, res) => {
  const { videoId } = req.body;
  const user = await User.findById(req.userId);

  if (!user.purchasedVideos.includes(videoId)) {
    user.purchasedVideos.push(videoId);
    await user.save();
  }

  res.json({ message: "Video purchased" });
};
