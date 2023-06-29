const { reviewService } = require("../services");
const { catchAsync } = require("../utils/error");

const getReview = catchAsync(async (req, res) => {
  const { eventId } = req.params;
  const { orderBy } = req.query;

  const review = await reviewService.getReview(eventId, orderBy)
  res.status(200).json(review);
});

const deleteReview = catchAsync(async(req, res) => {
  try{
    const userId = req.user.id
    const { reviewId } = req.params;

    if (!userId || !reviewId) {
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
  
      throw error;
    }

    const review = await reviewService.getReviewById(reviewId);
    if (review.user_id !== userId) {
      const error = new Error("NOT_YOUR_REVIEW");
      error.statusCode = 401;
      throw error;
    }

    await reviewService.deleteReview(userId, reviewId);

    res.status(204).json();
  } catch (error) {
    console.log(error);
    res.statusCode(err.statusCode).json({ message: error.message })
  }
})

const createReview = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const requestBody = JSON.parse(req.body.data);
  const { eventId, content } = requestBody;

  const imageUrls = [];
  if (req.files && req.files.length > 0) {
    req.files.forEach(file => {
      imageUrls.push(file.location);
    });
  }

  if (!eventId || !content) {
    const error = new Error("KEY_ERROR");
    error.statusCode = 400;

    throw error;
  }

  await reviewService.createReview(userId, eventId, content, imageUrls);

  res.status(201).json({ message: "Create_Completed"})
})

module.exports = {
  getReview,
  createReview,
  deleteReview,
}
