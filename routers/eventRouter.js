const express = require("express");
const eventController = require("../controller/eventController");

const router = express.Router();

router.get("", eventController.getEventList);

module.exports = router;
