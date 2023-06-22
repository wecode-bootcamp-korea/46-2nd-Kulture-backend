const express = require("express");
const eventController = require("../controller/eventController");

const router = express.Router();

router.get("", eventController.getEventList);
router.get("/:eventId", eventController.getEventDetail);

module.exports = router;
