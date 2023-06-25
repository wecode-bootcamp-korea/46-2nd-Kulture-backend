const express = require("express");

const userRouter = require("./userRouter");
const eventRouter = require("./eventRouter");
const bidRouter = require("./bidRouter");
const wishlistRouter = require("./wishlistRouter");
const orderRouter = require("./orderRouter");
const reviewRouter = require("./reviewRouter");

const router = express.Router();

router.use("/users", userRouter);
router.use("/events", eventRouter);
router.use("/bid", bidRouter);
router.use("/wishlist", wishlistRouter);
router.use("/order", orderRouter);
router.use("/review", reviewRouter);

module.exports = router;
