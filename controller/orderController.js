const { orderService } = require("../services");
const { catchAsync } = require("../utils/error");

const getOrderInfo = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const result = await orderService.getOrderInfo(userId);

  return res.status(200).json(result);
});

module.exports = {
  getOrderInfo,
};
