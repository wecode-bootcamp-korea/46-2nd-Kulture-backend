const { bidDao } = require("../models");
const { getUserById } = require("./userService");


const getBidEventsToken = async (eventId) => {
  return await bidDao.getBidEventsToken(eventId)
};


module.exports = {
  getBidEventsToken,
}