const { wishlistService } = require("../services");
const { catchAsync } = require("../utils/error");

const createWishlist = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { eventId } = req.body;

  if (!userId || !eventId) {
    const error = new Error("KEY_ERROR");
    error.statusCode = 400;

    throw error;
  }
  const createWishlist = await wishlistService.createWishlist(userId, eventId);

  res.status(201).json({ message: "create Wishlist" });
});

const deleteWishlist = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const eventIds = req.params.eventIds.split(",");

  const deleteWishlist = await wishlistService.deleteWishlist(userId, eventIds);

  res.status(204).json();
});

const getWishlist = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { limit, offset } = req.query;
  const wishlist = await wishlistService.getWishlist(userId, limit, offset);

  res.status(200).json({ wishlist });
});

module.exports = {
  createWishlist,
  deleteWishlist,
  getWishlist,
};
