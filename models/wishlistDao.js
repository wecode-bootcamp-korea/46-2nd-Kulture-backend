const appDataSource = require("./dataSource");

const createWishlist = async (userId, eventId) => {
  try {
    const result = await appDataSource.query(
      `
      INSERT INTO wishlists(
        user_id,
        event_id
      ) VALUES (?, ?)
      `,
      [userId, eventId]
    );
    return result;
  } catch {
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error;
  }
};

const deleteWishlist = async (userId, eventIds) => {
  try {
    const result = await appDataSource.query(
      `
      DELETE FROM wishlists
      WHERE user_id = ? AND event_id IN (?)
      `,
      [userId, eventIds]
    );

    return result;
  } catch (err) {
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error;
  }
};



const getWishlist = async (userId) => {
  try {
    const result = await appDataSource.query(
      `
    SELECT
      events.id,
      events.name,
      events.thumbnail_images_url,
      events.remaining_quantity,
      events.auction_end_date,
      events.start_events_token
    FROM wishlists
    INNER JOIN events ON events.id = wishlists.event_id
    WHERE wishlists.user_id = ?
      `,
      [userId]
    );
    return result;
  } catch (err) {
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error;
  }
};

module.exports = {
  createWishlist,
  deleteWishlist,
  getWishlist,
};
