const appDataSource = require("./dataSource");

const getOrderInfo = async (userId) => {
  try {
    const result = await appDataSource.query(
      `
        SELECT 
        orders.id,
        order_events.event_id,
        events.name,
        events.thumbnail_images_url as image_url,
        events.location,
        DATE_FORMAT(events.event_start_date, '%Y-%m-%d') as event_start_date,
        orders.total_event_token,
        events.id as eventId
      FROM events
      LEFT JOIN order_events ON events.id = order_events.event_id
      LEFT JOIN orders ON order_events.order_id = orders.id
      LEFT JOIN order_status_code ON orders.id = order_status_code.order_id
      WHERE orders.user_id = ?
        `,
      [userId]
    );

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("CANNOT GET CONFIRMED ORDERS");
  }
};

module.exports = {
  getOrderInfo,
};
