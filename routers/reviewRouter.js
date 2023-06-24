const express = require("express");
const reviewController = require("../controller/reviewController");

const router = express.Router();

router.get("/:eventId", reviewController.getReview);
router.get("", reviewController.getReview);

module.exports = router;
