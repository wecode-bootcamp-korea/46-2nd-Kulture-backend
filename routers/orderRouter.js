const express = require("express");
const router = express.Router();
const { validateToken } = require("../middleware/auth");

const orderController = require("../controller/orderController");

router.get("", validateToken, orderController.getOrderInfo);

module.exports = router;