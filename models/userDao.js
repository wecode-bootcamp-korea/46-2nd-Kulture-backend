const appDataSource = require("./dataSource");

const getUserById = async (id) => {
  const [users] = await appDataSource.query(
    `
    SELECT
      id,
      kakao_id,
      email,
      nickname,
      gender,
      age_range,
      profile_image_url,
      event_token
    FROM users
    WHERE id = ?`,
    [id]
  );
  return users
};

const getUserByKakaoId = async (kakaoId) => {
  const [users] = await appDataSource.query(
    `
    SELECT
      id,
      kakao_id,
      email,
      nickname,
      gender,
      age_range,
      profile_image_url,
      event_token
    FROM users
    WHERE kakao_id = ?`,
    [kakaoId]
  );
  return users
};

const signUp = async (email, name, kakaoId, gender, ageRange, profileImage) => {
  await appDataSource.query(
    `
    INSERT INTO users(
        email,
        nickname,
        kakao_id,
        gender,
        age_Range,
        profile_image_url
    ) VALUES (?, ?, ?, ?, ?, ?)`,
    [email, name, kakaoId, gender, ageRange, profileImage]
  );
  return getUserById(kakaoId);
};

const userInfo = async (userId) => {
  try {
    const result = await appDataSource.query(`
      SELECT
        id,
        nickname,
        profile_image_url,
        email,
        age_range,
        gender,
        event_token
      FROM users
      WHERE id = ?
      `, [userId]
    );

    return result
        } catch {
          const error = new Error("dataSource Error");
          error.statusCode = 400;

          throw error;
        }
}

const updateUserInfo = async (nickname, profileImageUrl, userId) => {
  try {
    return await appDataSource.query(`
      UPDATE users
      SET 
        nickname = ?,
        profile_image_url = ? 
      WHERE id = ?`,
      [nickname, profileImageUrl, userId]
      );
  } catch (err) {
    console.log(err);
    const error = new Error("dataSource Error");
    error.statusCode = 400;
    throw error
  }
}

const tokenHistoryByUser = async(userId) => {
  try {
    const result = await appDataSource.query(`
    SELECT subquery.user_id, subquery.token_type, subquery.event_token, subquery.name, subquery.date
    FROM (
      SELECT
        user_id,
        'charge' AS token_type,
        amount AS event_token,
        'Payment Charge' AS name,
        DATE_FORMAT(created_at, '%Y-%m-%d') AS date
      FROM event_token_histories
      WHERE user_id = ?
      UNION ALL
      SELECT
        o.user_id,
        'usage' AS token_type,
        o.total_event_token AS event_token,
        e.name,
        DATE_FORMAT(o.created_at, '%Y-%m-%d') AS date
      FROM orders o
      JOIN order_events oe ON o.id = oe.order_id
      JOIN events e ON oe.event_id = e.id
      WHERE o.user_id = ?
    ) AS subquery
    ORDER BY date DESC
    `,
    [userId, userId]
    )
    return result
    } catch {
      const error = new Error("dataSource Error");
      error.statusCode = 400;

      throw error;
  }
}

module.exports = {
  getUserById,
  signUp,
  getUserByKakaoId,
  userInfo,
  updateUserInfo,
  tokenHistoryByUser,
};
