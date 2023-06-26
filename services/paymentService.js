const { paymentDao } = require("../models");

const createPayment = async (userId, paymentData) => {
  return await paymentDao.createPayment(userId, paymentData);
};

module.exports = {
  createPayment,
};
