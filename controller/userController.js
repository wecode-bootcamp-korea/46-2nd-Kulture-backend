const { userService } = require("../services");
const { catchAsync } = require("../utils/error");

const signInKakao = catchAsync(async (req, res, next) => {
  const headers = req.headers["authorization"];

  if (!headers) {
    return res.status(400).json({ error: "Authorization header required" });
  }

  const kakaoToken = headers.split(" ")[1];

  if (!kakaoToken) {
    return res.status(400).json({ error: "Bearer token required" });
  }

  const jwtToken = await userService.signInKakao(kakaoToken);

  return res
    .status(200)
    .json({ message: "login Success", accessToken: jwtToken });
});

const userInfo = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const userInfo = await userService.userInfo(userId);

  return res.json(userInfo)
})

const updateUserInfo = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const requestBody = JSON.parse(req.body.data);
  const { nickname } = requestBody;

  const profileImageUrl = req.file.location;

  if (!nickname || !profileImageUrl) {
    const error = new Error("KEY_ERROR")
    error.statusCode = 400;

    throw error;
  }

  const userInfo = await userService.updateUserInfo(nickname, profileImageUrl, userId)

  res.status(200).json({ message: "Update UserInfo" })
  
})
module.exports = {
  signInKakao,
  userInfo,
  updateUserInfo,
};
