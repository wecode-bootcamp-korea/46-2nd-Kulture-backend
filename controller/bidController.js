const { bidService } = require("../services");
const { catchAsync } = require("../utils/error");

const deleteBid = catchAsync(async(req, res) => {
  try{
    const userId = req.user.id
    const { eventId } =req.params;

    await bidService.deleteBid(userId, eventId);

    res.status(204).json();
  } catch (error) {
    console.log(error);
    res.statusCode(error.statusCode).json({ message: error.message });
  }
})


const createBid = catchAsync(async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventId, quantity, biddingEventsToken } = req.body;
    const bidStatusCode = "BID_PENDING";

    const createBid = await bidService.createBid(
      userId,
      eventId,
      quantity,
      biddingEventsToken,
      bidStatusCode
    );

    res.status(201).json({ message: " Create Bid "});
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).json({ message: error.message });
  }
});

module.exports = {
  deleteBid,
  createBid,
}
