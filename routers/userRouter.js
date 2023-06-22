const express = require("express");
const userController = require("../controller/userController");
const { validateToken } = require("../middleware/auth")

const router = express.Router();

router.post("/kakao/signin", userController.signInKakao);
router.get("", validateToken, userController.userInfo)

module.exports = router;
