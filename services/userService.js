const { userDao } = require("../models");
const axios = require("axios");
const jwt = require("jsonwebtoken");

const signInKakao = async (kakaoToken) => {
  const result = await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: {
      Authorization: `Bearer ${kakaoToken}`,
    },
  });

  if (result.status !== 200) {
    throw new Error("CANNOT EXCESS TO KAKAOTOKEN");
  }

  const { data } = result;
  const name = data.properties.nickname;
  const email = data.kakao_account.email;
  const kakaoId = data.id;
  const gender = data.kakao_account.gender;
  const ageRange = data.kakao_account.age_range;
  const profileImage = data.properties.profile_image;

  if (!name || !email || !kakaoId) throw new Error("KEY_ERROR", 400);

  let user = await userDao.getUserByKakaoId(kakaoId);

  if (!user) {
    await userDao.signUp(email, name, kakaoId, gender, ageRange, profileImage);
    user = await userDao.getUserByKakaoId(kakaoId);
  }

  const accessToken = jwt.sign(
    { id: user.id, kakaoId: user.kakaoId },
    process.env.JWT_SECRET,
    {
      algorithm: process.env.JWT_ALGORITHM,
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  return accessToken;
};

const getUserById = async (id) => {
  return await userDao.getUserById(id);
};

const getUserByKakaoId = async (kakaoId) => {
  return await userDao.getUserByKakaoId(kakaoId);
};

const userInfo = async(userId) => {
  return await userDao.userInfo(userId)
}

module.exports = {
  signInKakao,
  getUserById,
  getUserByKakaoId,
  userInfo,
};
