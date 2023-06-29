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

const deleteReview = async( reviewId, userId) => {
  return await reviewDao.deleteReview(reviewId, userId)
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
