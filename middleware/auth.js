const jwt = require("jsonwebtoken");
const { userService } = require("../services");

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const secretKey = process.env.JWT_SECRET;
    const decode = await jwt.verify(token, secretKey);

    const user = await userService.getUserById(decode.id);

    if (!decode) {
      const error = new Error("NEED_ACCESS_TOKEN");
      error.statusCode = 401;

      return res.status(error.statusCode).json({ message: error.message });
    }
    
    if (!user) {
      const error = new Error("USER_DOES_NOT_EXIST");
      error.statusCode = 404;

      return res.status(error.statusCode).json({ message: error.message });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    const error = new Error("INVALID_ACCESS_TOKEN");
    error.statusCode = 401;

    return res.status(error.statusCode).json({ message: error.message });
  }
};

module.exports = {
  validateToken,
};
