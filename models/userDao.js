const appDataSource = require("./dataSource");

const getUserById = async (id) => {
  const [ users ] = await appDataSource.query(
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
  return users;
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

module.exports = {
  getUserById,
  signUp,
  getUserByKakaoId,
  userInfo
};
