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

const createBidOrder = async (userId, bidId, orderNumber, eventId, quantity, totalEventToken) => {
  const queryRunner = appDataSource.createQueryRunner();

  await queryRunner.connect();

  try {
    await queryRunner.startTransaction();

    let [userEventToken] = await appDataSource.query(
      `SELECT event_token FROM users WHERE id = ?`,
      [userId]
    );

    userEventToken = userEventToken.event_token;

    if(totalEventToken > userEventToken) {
      const error = new Error("NOT_ENOUGH_POINTS");
      error.statusCode = 400;

      throw error;
    }

    const orderResult = await appDataSource.query(
      `INSERT INTO orders (user_id, bid_id, order_number, total_event_token)
      VALUES (?, ?, ?, ?)`,
      [userId, bidId, orderNumber, totalEventToken]
    );
    const orderId = orderResult.insertId;

    await appDataSource.query(
      `INSERT INTO order_events (order_id, event_id, quantity)
      VALUES (?, ?, ?)`,
      [orderId, eventId, quantity]
    );

    await appDataSource.query(
      `UPDATE users
      SET event_token = event_token - ?
      WHERE id = ?`,
      [totalEventToken, userId]
    );

    await appDataSource.query(
      `UPDATE bid
      SET bid_status_code = 'bid_accepted'
      WHERE id = ?`,
      [bidId]
    );

    await appDataSource.query(
      `INSERT INTO order_status_code (order_id, code_type)
      VALUES (?, 'success')`,
      [orderId]
    );

    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw err;
  } finally {
    await queryRunner.release();
  }
};

const createOrder = async (userId, orderNumber, totalEventToken, eventId, quantity) => {
  const queryRunner = appDataSource.createQueryRunner();

  await queryRunner.connect();

  try {
    await queryRunner.startTransaction();

    let [userEventToken] = await appDataSource.query(
      `SELECT event_token FROM users WHERE id = ?`,
      [userId]
    );
    
    userEventToken = userEventToken.event_token;

    if(totalEventToken > userEventToken) {
      const error = new Error("NOT_ENOUGH_POINTS");
      error.statusCode = 400;

      throw error;
    }

    const orderResult = await appDataSource.query(
      `INSERT INTO orders (user_id, order_number, total_event_token)
      VALUES (?, ?, ?)`,
      [userId, orderNumber, totalEventToken]
    );
    const orderId = orderResult.insertId;

    await appDataSource.query(
      `INSERT INTO order_events (order_id, event_id, quantity)
      VALUES (?, ?, ?)`,
      [orderId, eventId, quantity]
    );

    await appDataSource.query(
      `UPDATE users
      SET event_token = event_token - ?
      WHERE id = ?`,
      [totalEventToken, userId]
    );

    await appDataSource.query(
      `INSERT INTO order_status_code (order_id, code_type)
      VALUES (?, 'success')`,
      [orderId]
    );

    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw err;
  } finally {
    await queryRunner.release();
  }
};


module.exports = {
  getOrderInfo,
  createBidOrder,
  createOrder
};
