const { reviewService } = require("../services");
const { catchAsync } = require("../utils/error");

const getReview = catchAsync(async (req, res) => {
  const { eventId } = req.params;
  const { orderBy } = req.query;

  const review = await reviewService.getReview(eventId, orderBy)
  res.status(200).json(review);
});


module.exports = {
  getReview,
};
