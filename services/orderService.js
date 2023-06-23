const { orderDao } = require("../models");
const { v4 } = require("uuid");

const getOrderInfo = async (userId) => {
  return await orderDao.getOrderInfo(userId);
};

const createBidOrder = async (userId, bidId, totalEventToken, eventId, quantity) => {
  const orderNumber = v4();
  const result = await orderDao.createBidOrder(
    userId,
    bidId,
    orderNumber,
    totalEventToken,
    eventId,
    quantity
  );
  return result;
};

const createOrder = async(userId, totalEventToken, eventId, quantity) => {
  const orderNumber = v4();
  const result = await orderDao.createOrder(
    userId,
    orderNumber,
    totalEventToken,
    eventId,
    quantity
  );
return result
}

module.exports = {
  createBidOrder,
  createOrder,
  getOrderInfo,
}
