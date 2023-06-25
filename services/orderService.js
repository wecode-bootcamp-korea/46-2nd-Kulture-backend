const { orderDao } = require("../models");

const getOrderInfo = async (userId) => {
  return await orderDao.getOrderInfo(userId);
};

module.exports = {
  getOrderInfo,
};
