const { wishlistDao } = require("../models");

const createWishlist = async (userId, eventId) => {
  return await wishlistDao.createWishlist(userId, eventId);
};

const deleteWishlist = async (userId, eventIds) => {
  return await wishlistDao.deleteWishlist(userId, eventIds);
};

const getWishlist = async (userId) => {
  return await wishlistDao.getWishlist(userId);
};

module.exports = {
  createWishlist,
  deleteWishlist,
  getWishlist,
};