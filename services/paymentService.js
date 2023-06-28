const { paymentDao } = require("../models");


const createPayment = async (userId, paymentData) => {
  if (paymentData.payment_method_type === "MONEY") {
    return await paymentDao.createMoneyPayment(userId, paymentData);
  } else {
    return await paymentDao.createCardPayment(userId, paymentData);
  }
};

module.exports = {
  createPayment,
};
