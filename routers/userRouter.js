const express = require("express");
const userController = require("../controller/userController");
const { validateToken } = require("../middleware/auth")
const { profileUpload } = require("../middleware/s3")

const router = express.Router();

router.post("/kakao/signin", userController.signInKakao);
router.get("/token", validateToken, userController.tokenHistoryByUser)
router.get("", validateToken, userController.userInfo)
router.patch("", validateToken, profileUpload.single('profileImageUrl'), userController.updateUserInfo)

module.exports = router;
