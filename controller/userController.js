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

module.exports = {
  signInKakao,
};
