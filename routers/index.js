const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const bidRouter = require("./bidRouter");

router.use("/users", userRouter);
router.use("/bid", bidRouter)

module.exports = router;
