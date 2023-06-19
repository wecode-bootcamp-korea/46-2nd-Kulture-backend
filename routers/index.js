const express = require("express");

const userRouter = require("./userRouter");
const eventRouter = require("./eventRouter");
const bidRouter = require("./bidRouter");

const router = express.Router();

router.use("/users", userRouter);
router.use("/events", eventRouter);
router.use("/bid", bidRouter);

module.exports = router;
