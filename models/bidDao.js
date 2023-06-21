const appDataSource = require("./dataSource")

const deleteBid = async (userId, eventId) => {
  try {
    const result = await appDataSource.query(`
    DELETE FROM bid
    WHERE user_id = ? AND event_id = ?
    `,
    [userId, eventId]
    );
    return result
  } catch (err) {
    console.log(err);
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error;
  }
}

module.exports = { 
  deleteBid,
}