const { paymentService } = require("../services");
const { catchAsync } = require("../utils/error");

const createPayment = catchAsync(async (req, res, next) => {
  const paymentData = req.body;
  const userId = req.user.id;

  const totalUserToken = await paymentService.createPayment(
    userId,
    paymentData
  );
  return res
    .status(200)
    .json({ message: "Payment successful", totalUserToken });
});

module.exports = {
  createPayment,
};
