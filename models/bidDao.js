const appDataSource = require("./dataSource");

const deleteBid = async (userId, eventId) => {
  try {
    const result = await appDataSource.query(
      `
    DELETE FROM bid
    WHERE user_id = ? AND event_id = ?
    `,
      [userId, eventId]
    );
    return result;
  } catch (err) {
    console.log(err);
    const error = new Error("dataSource Error");
    error.statusCode = 400;
    throw error;
  }
};

const createBid = async (userId, eventId, quantity, biddingEventsToken) => {
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
    );
    return result;
  } catch (err) {
    console.log(err);
    const error = new Error("dataSource Error");
    error.statusCode = 400;
    throw error;
  }
};

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
    `,
    [eventId, biddingEventsToken, biddingEventsToken]
  );

  return checkEventsToken[0].Exists;
};

const getBidInfo = async (userId) => {
  try {
    const result = await appDataSource.query(
      `
      SELECT 
       bid.id as bidId,
       events.name,
       events.id as event_id,
       events.location,
       DATE_FORMAT(events.event_start_date, "%Y-%m-%d") AS event_start_date,
       events.thumbnail_images_url as Image_url,
       DATE_FORMAT(events.auction_end_date, "%Y-%m-%d") AS auction_end_date,
       bid.quantity,
       bid.bid_status_code,
       bid.bidding_events_token
      FROM bid  
      LEFT JOIN events ON bid.event_id = events.id
      WHERE bid.user_id = ?
      GROUP BY bid.id, bid.bid_status_code, bid.bidding_events_token
      `,
      [userId]
    );
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("CANNOT GET BIDINFO");
  }
};

module.exports = {
  deleteBid,
  createBid,
  checkEventsToken,
  getBidInfo,
};
