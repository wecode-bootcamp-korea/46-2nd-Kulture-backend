const express = require("express");
const paymentController = require("../controller/paymentController");
const { validateToken } = require("../middleware/auth");

const router = express.Router();

router.post("/kakao", validateToken, paymentController.createPayment);

module.exports = router;
