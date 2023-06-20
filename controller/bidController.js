const { bidService } = require("../services");
const { catchAsync } = require("../utils/error");

const getBidEventsToken = catchAsync(async (req, res) => {
  try{
    const { eventId } = req.params;
    const bidEventToken = await bidService.getBidEventsToken(eventId);

    res.status(200).json({ message: bidEventToken })
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).json({ message: error.message });
  }
});

module.exports = {
  getBidEventsToken,
}
