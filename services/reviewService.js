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

const deleteReview = async( userId, reviewId) => {
  return await reviewDao.deleteReview(userId, reviewId)
};

module.exports = {
  getReview,
  createReview,
  deleteReview,
}
