const express = require("express");
const {  upload } = require("../lib/cloudinary");
const router = express.Router();


router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: true, message: "No image uploaded" });
    }

    const imageUrl = req.file.path;

    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    res.status(500).json({ error: true, message: error.message });
  }
});

module.exports = router;
