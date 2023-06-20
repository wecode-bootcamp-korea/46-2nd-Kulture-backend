const express = require("express");
const bidController = require("../controller/bidController");
const { validateToken } = require("../middleware/auth")

const router = express.Router();

router.get("/:eventId", bidController.getBidEventsToken);

module.exports = router