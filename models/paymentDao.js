const appDataSource = require("./dataSource");

const createCardPayment = async (userId, paymentData) => {
  try {
    const paymentResult = await appDataSource.query(
      `
        INSERT INTO event_token_payments
        (user_id, payment_status_code, information_json)
        VALUES (?, "SUCCESS", ?)
        `,
      [userId, JSON.stringify(paymentData.card_info)]
    );

    return await updateTokenHistory(userId, paymentData);
  } catch (error) {
    console.error(error);
    throw new Error("CARD_PAYMENT_FAILED");
  }
};

const createMoneyPayment = async (userId, paymentData) => {
  try {
    const paymentResult = await appDataSource.query(
      `
        INSERT INTO event_token_payments
        (user_id, payment_status_code, information_json)
        VALUES (?, "SUCCESS", "DEFAULT")
        `,
      [userId, paymentData.amount]
    );

    return await updateTokenHistory(userId, paymentData);
  } catch (error) {
    console.error(error);
    throw new Error("MONEY_PAYMENT_FAILED");
  }
};

const updateTokenHistory = async (userId, paymentData) => {
  try {
    const tokenHistoryResult = await appDataSource.query(
      `
      INSERT INTO event_token_histories
      (user_id, amount, type)
      VALUES (?, ?, ?)
      `,
      [userId, paymentData.quantity, paymentData.payment_method_type]
    );

    const totalUserAmountResult = await appDataSource.query(
      `
      SELECT SUM(amount) as user_total_token
      FROM event_token_histories
      WHERE user_id = ?
      `,
      [userId]
    );

    const totalUserAmount = totalUserAmountResult[0].user_total_token;

    await appDataSource.query(
      `
      UPDATE users
      SET event_token = ?
      WHERE id = ?
      `,
      [totalUserAmount, userId]
    );

    const totalUserToken = await appDataSource.query(
      `
      SELECT event_token
      FROM users
      WHERE id = ? 
      `,
      [userId]
    );

    return totalUserToken[0].event_token;
  } catch (error) {
    console.error(error);
    throw new Error("TOKEN_UPDATE_FAILED");
  }
};

module.exports = {
  createCardPayment,
  createMoneyPayment,
};
