const { reviewDao } = require("../models");

const getReview = async (eventId, orderBy) => {
  return await reviewDao.getReview(eventId, orderBy);
};

module.exports = {
  getReview,
};
