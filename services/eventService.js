const { eventDao } = require("../models");

const getEventList = async (
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
) => {
  const getEventList = await eventDao.getEventList(
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
  return getEventList;
};
module.exports = {
  getEventList,
};
