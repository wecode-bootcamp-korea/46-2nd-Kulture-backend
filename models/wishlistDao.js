const appDataSource = require("./dataSource");
const CustomQueryBuilder = require("./queryBuilder");

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

const getWishlist = async (userId, limit, offset) => {
  try {
    let Builder = new CustomQueryBuilder();
    Builder
      .select(
        `
        wishlists.event_id,
        events.name,
        events.thumbnail_images_url,
        events.remaining_quantity,
        events.auction_end_date,
        events.start_events_token
        `
      )
      .from(`wishlists`)
      .join(`INNER JOIN events ON events.id = wishlists.event_id`)
      .where(`wishlists.user_id = ${userId}`)
      .limit(limit, offset);

    const wishlistQuery = Builder.build();

    const wishlist = await appDataSource.query(
      wishlistQuery.query,
      wishlistQuery.parameters
    );

    return wishlist;
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
