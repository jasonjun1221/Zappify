const asyncHandler = require("../utils/asyncHandler.js");
const Coupon = require("../models/couponModel.js");

// @desc    Create a new coupon
// @route   POST /api/coupons
// @access  Private/Admin
const createCoupon = asyncHandler(async (req, res) => {
  const { name, expiry, discount } = req.body;

  if (!name || !expiry || !discount) {
    res.status(400);
    throw new Error("All fields are required.");
  }

  const coupon = await Coupon.create({ name, expiry, discount });
  res.status(201).json({ success: "success", coupon });
});

// @desc    Get all coupons
// @route   GET /api/coupons
// @access  Private/Admin
const getCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find({}).sort({ createdAt: -1 });
  res.status(200).json({ success: "success", coupons });
});

// @desc    Get a coupon by ID
// @route   GET /api/coupons/:id
// @access  Private/Admin
const getCouponById = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findOne({ _id: req.params.id, expiry: { $gt: Date.now() } });

  if (!coupon) {
    res.status(404);
    throw new Error("Coupon not found.");
  }

  res.status(200).json({ success: "success", coupon });
});

// @desc    Delete a coupon
// @route   DELETE /api/coupons/:id
// @access  Private/Admin
const deleteCoupon = asyncHandler(async (req, res, next) => {
  const coupon = await Coupon.findOneAndDelete(req.params.id);

  if (!coupon) {
    res.status(404);
    throw new Error("Coupon not found.");
  }

  res.status(200).json({ message: "Coupon removed successfully." });
});

module.exports = { createCoupon, getCoupons, getCouponById, deleteCoupon };
