const { paymentService } = require("../services");
const { catchAsync } = require("../utils/error");

const createPayment = catchAsync(async (req, res, next) => {
  const paymentData = req.body;
  const userId = req.user.id;

  if (paymentData.payment_method_type === "MONEY") {
    if (
      !paymentData.aid ||
      !paymentData.tid ||
      !paymentData.cid ||
      !paymentData.partner_order_id ||
      !paymentData.partner_user_id ||
      !paymentData.item_name ||
      !paymentData.quantity ||
      !paymentData.amount ||
      !paymentData.created_at ||
      !paymentData.approved_at
    ) {
      throw new Error("KEY ERROR");
    }
  }

  if (paymentData.payment_method_type === "CARD") {
    if (
      !paymentData.aid ||
      !paymentData.tid ||
      !paymentData.cid ||
      !paymentData.partner_order_id ||
      !paymentData.partner_user_id ||
      !paymentData.item_name ||
      !paymentData.quantity ||
      !paymentData.amount ||
      !paymentData.card_info ||
      !paymentData.created_at ||
      !paymentData.approved_at
    ) {
      throw new Error("KEY ERROR");
    }
  }

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
