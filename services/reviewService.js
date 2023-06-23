const { reviewDao } = require("../models");

const getReview = async (eventId, orderBy) => {
  return await reviewDao.getReview(eventId, orderBy);
};


const createReview = async (userId, eventId, content, imageUrls) => {
  const createReview = await reviewDao.createReview(
    userId,
    eventId,
    content,
    imageUrls
  );
  return createReview
}

module.exports = {
  getReview,
  createReview,
}
