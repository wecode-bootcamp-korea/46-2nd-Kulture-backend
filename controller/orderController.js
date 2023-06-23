const { orderService } = require("../services");
const { catchAsync } = require("../utils/error");

const getOrderInfo = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const result = await orderService.getOrderInfo(userId);

  return res.status(200).json(result);
});


const createBidOrder = catchAsync(async (req, res) => {
  try {
    const userId = req.user.id;
    const { bidId, eventId, quantity, totalEventToken } = req.body;

    if (!bidId || !eventId || !quantity || !totalEventToken) {
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
  
      throw error;
    }

    const result = await orderService.createBidOrder(
      userId,
      bidId,
      eventId,
      quantity,
      totalEventToken
    );

    return res.status(201).json({ message: "ORDER_COMPLETED" });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).json({ message: error.message });
  }
});

const createOrder = catchAsync(async (req, res) => {
  try {
    const userId = req.user.id;
    const { totalEventToken, eventId, quantity } = req.body;

    if (!totalEventToken || !eventId || !quantity) {
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
  
      throw error;
    }

    const result = await orderService.createOrder(
      userId,
      totalEventToken,
      eventId,
      quantity
    );
   
    return res.status(201).json({ message: "ORDER_COMPLETED" });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).json({ message: error.message });
  }
});


module.exports = {
  getOrderInfo,
  createBidOrder,
  createOrder,
};
