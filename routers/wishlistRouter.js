const express = require("express");
const wishlistController = require("../controller/wishlistController");
const { validateToken } = require("../middleware/auth");

const router = express.Router();

router.post("", validateToken, wishlistController.createWishlist);
router.delete("/:eventIds", validateToken, wishlistController.deleteWishlist);
router.get("", validateToken, wishlistController.getWishlist);

module.exports = router