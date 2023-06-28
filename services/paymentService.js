const {
  createCardPayment,
  createMoneyPayment,
} = require("../models/paymentDao");

const createPayment = async (userId, paymentData) => {
  if (paymentData.payment_method_type === "MONEY") {
    return await createMoneyPayment(userId, paymentData);
  } else {
    return await createCardPayment(userId, paymentData);
  }
};

module.exports = {
  createPayment,
};
