const express = require("express");

const userRouter = require("./userRouter");
const eventRouter = require("./eventRouter");
const bidRouter = require("./bidRouter");
const wishlistRouter = require("./wishlistRouter")

const router = express.Router();

router.use("/users", userRouter);
router.use("/events", eventRouter);
router.use("/bid", bidRouter);
router.use("/wishlist", wishlistRouter);

module.exports = router;