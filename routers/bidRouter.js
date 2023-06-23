const express = require("express");
const bidController = require("../controller/bidController");
const { validateToken } = require("../middleware/auth");

const router = express.Router();

router.delete("/:eventId", validateToken, bidController.deleteBid);
router.post("", validateToken, bidController.createBid);
router.get("", validateToken, bidController.getBidInfo);

module.exports = router;
