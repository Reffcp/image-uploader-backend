const express = require("express");
const controller = require("./controller");
const router = express.Router();
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/upload", upload.single("image"), controller.uploadImage);
module.exports = router;
