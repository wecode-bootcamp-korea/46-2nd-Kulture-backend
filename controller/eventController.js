const { eventService } = require("../services");
const { catchAsync } = require("../utils/error");

const getEventList = catchAsync(async (req, res) => {
  const {
    categoryId,
    eventId,
    minPrice,
    maxPrice,
    ageRange,
    orderBy,
    limit,
    offset,
    countryId,
    eventStartDate,
    eventName,
  } = req.query;

  const eventData = await eventService.getEventList(
    categoryId,
    eventId,
    minPrice,
    maxPrice,
    ageRange,
    orderBy,
    limit,
    offset,
    countryId,
    eventStartDate,
    eventName
  );
  return res.status(200).json({ data: eventData });
});

module.exports = {
  getEventList,
};
