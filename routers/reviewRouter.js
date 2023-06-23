const express = require("express");
const reviewController = require("../controller/reviewController");
const { validateToken } = require("../middleware/auth");
const { fileUpload } = require("../middleware/s3")

const router = express.Router();

router.get("/:eventId", reviewController.getReview);
router.get("", reviewController.getReview);
router.post("", validateToken, fileUpload.array('imageUrls', 3), reviewController.createReview);

module.exports = router;