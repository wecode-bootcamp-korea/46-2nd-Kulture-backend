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

module.exports = {
  deleteBid,
}
