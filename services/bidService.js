const { bidDao } = require("../models");

const deleteBid = async (userId, eventId) => {
  return await bidDao.deleteBid(userId, eventId);
};

const getBidInfo = async (userId) => {
  return await bidDao.getBidInfo(userId);
};

const createBid = async (userId, eventId, quantity, biddingEventsToken) => {
  const userToken = await getUserById(userId);

  if (userToken < biddingEventsToken) {
    throw new Error("Please Charge the Token");
  }
  return await bidDao.createBid(userId, eventId, quantity, biddingEventsToken);
};

const validateToken = async (eventId, biddingEventsToken) => {
  const tokenExists = await checkEventsToken(eventId, biddingEventsToken);

  if (!tokenExists) {
    throw new Error("Please re-enter token");
  }
  return await bidDao.checkEventsToken(eventId, biddingEventsToken);
};

module.exports = {
  deleteBid,
  createBid,
  validateToken,
  getBidInfo,
};
