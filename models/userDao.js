const appDataSource = require("./dataSource");

const getUserById = async (kakaoId) => {
  const [ users ] = await appDataSource.query(
    `
    SELECT
      id,
      kakao_id,
      email,
      nickname,
      gender,
      age_range,
      profile_image_url
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

module.exports = {
  getUserById,
  signUp,
};
