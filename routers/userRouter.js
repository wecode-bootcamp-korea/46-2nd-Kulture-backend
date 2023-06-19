const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();

router.post("/kakao/signin", userController.signInKakao);

module.exports = router;
