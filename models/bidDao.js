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
    throw error
  }
}    

const createBid = async(userId, eventId, quantity, biddingEventsToken) => {
  try {
  
    const result = await appDataSource.query(
      `INSERT INTO bid (
        user_id,
        event_id,
        quantity,
        bidding_events_token,
        bid_status_code
      ) 
      VALUES(?, ?, ?, ?, ?)`,
      [userId, eventId, quantity, biddingEventsToken, "BID_PENDING"]
    )
    return result;
  } catch (err) {
    console.log(err);
    const error = new Error("dataSource Error");
    error.statusCode = 400;
    throw error
  }
}

const checkEventsToken = async (eventId, biddingEventsToken) => {
  const checkEventsToken = await appDataSource.query(
    `
    SELECT EXISTS (
      SELECT *
      FROM events
      WHERE id = ? 
        AND ? >= start_events_token 
        AND ? <= highest_events_token
    ) AS Exists
    `, [eventId, biddingEventsToken, biddingEventsToken]
  );

  return checkEventsToken[0].Exists;
};



module.exports = { 
  deleteBid,
  createBid,
  checkEventsToken,
}