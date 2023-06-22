const { eventService } = require("../services");
const { catchAsync } = require("../utils/error");

const getEventDetail = async (req, res) => {
  const eventId = req.params.eventId;
  try {
    const result = await eventService.getEventDetail(eventId);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Fail to Get Detail" });
  }
};

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
  getEventDetail,
};
