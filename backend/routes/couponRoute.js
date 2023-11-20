const express = require("express");
const router = express.Router();
const { createCoupon, getCoupons, getCoupon, deleteCoupon, sendEmail } = require("../controllers/couponController.js");
const { protect, admin } = require("../middlewares/authMiddleware.js");

router.post("/", protect, admin, createCoupon);
router.get("/", protect, admin, getCoupons);
router.get("/:couponName", protect, getCoupon);
router.delete("/:id", protect, admin, deleteCoupon);
router.post("/send-email", protect, sendEmail);

module.exports = router;
