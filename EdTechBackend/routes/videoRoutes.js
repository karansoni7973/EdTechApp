const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getAllVideos, purchaseVideo } = require("../controllers/videoController");

router.get("/", getAllVideos);
router.post("/purchase", auth, purchaseVideo);

module.exports = router;
