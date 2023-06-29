const { reviewDao } = require("../models");

const getReview = async (eventId) => {
  return await reviewDao.getReview(eventId);
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

const deleteReview = async(userId, reviewId) => {
  await reviewDao.deleteReview(userId, reviewId)
};

const getReviewById = async(reviewId) => {
  return await reviewDao.getReviewById(reviewId)
}

module.exports = {
  getReview,
  createReview,
  deleteReview,
  getReviewById,
}
