const appDataSource = require("./dataSource");

const createPayment = async (userId, paymentData) => {
  try {
    let paymentResult, tokenHistoryResult;

    if (paymentData.payment_method_type === "MONEY") {
      console.log("MONEY");
      paymentResult = await appDataSource.query(
        `
          INSERT INTO event_token_payments
          (user_id, payment_status_code, information_json)
          VALUES (?, "SUCCESS", "DEFAULT")
          `,
        [userId, paymentData.amount]
      );

      tokenHistoryResult = await appDataSource.query(
        `
          INSERT INTO event_token_histories
          (user_id, amount, type)
          VALUES (?, ?, ?)
          `,
        [userId, paymentData.quantity, paymentData.payment_method_type]
      );
    } else {
      console.log("CARD");
      paymentResult = await appDataSource.query(
        `
          INSERT INTO event_token_payments
          (user_id, payment_status_code, information_json)
          VALUES (?, "SUCCESS", ?)
          `,
        [userId, JSON.stringify(paymentData.card_info)]
      );

      tokenHistoryResult = await appDataSource.query(
        `
        INSERT INTO event_token_histories
        (user_id, amount, type)
        VALUES (?, ?, ?)
        `,
        [userId, paymentData.quantity, paymentData.payment_method_type]
      );
    }

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
    throw new Error("PAYMENT_RECORD_ADD_FAILED");
  }
};

module.exports = {
  createPayment,
};
