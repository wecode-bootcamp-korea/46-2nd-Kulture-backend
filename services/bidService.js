const { bidDao } = require("../models");
const { getUserById } = require("./userService");

const deleteBid = async (userId, eventId) => {
  return await bidDao.deleteBid(userId, eventId)
};

module.exports = {
  deleteBid,
}