const express = require("express");
const orderController = require("../controller/orderController");
const { validateToken } = require("../middleware/auth")

const router = express.Router();

router.get("", validateToken, orderController.getOrderInfo);
router.post("/bid", validateToken, orderController.createBidOrder);
router.post("/now", validateToken, orderController.createOrder);


module.exports = router
