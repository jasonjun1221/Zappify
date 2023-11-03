const asyncHandler = require("../utils/asyncHandler.js");
const Coupon = require("../models/couponModel.js");

// @desc    Create a new coupon
// @route   POST /api/coupons
// @access  Private/Admin
const createCoupon = asyncHandler(async (req, res) => {
  const { name, expiry, discount } = req.body;

  // Check if all fields are filled in
  if (!name || !expiry || !discount) {
    res.status(400);
    throw new Error("Please enter all fields.");
  }

  await Coupon.create({ name, expiry, discount });
  res.status(201).json({ success: "success", message: "Coupon created successfully." });
});

// @desc    Get all coupons
// @route   GET /api/coupons
// @access  Private/Admin
const getCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find({}).sort({ createdAt: -1 });
  res.status(200).json({ success: "success", coupons });
});

// @desc    Get a coupon
// @route   GET /api/coupons/:couponName
// @access  Private
const getCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findOne({ name: req.params.couponName });

  // Check if coupon exists
  if (!coupon) {
    res.status(404);
    throw new Error("Coupon not found.");
  }

  // Check if coupon is expired
  if (coupon.expiry < Date.now()) {
    res.status(404);
    throw new Error("Coupon is expired.");
  }

  res.status(200).json({ success: "success", coupon });
});

// @desc    Delete a coupon
// @route   DELETE /api/coupons/:id
// @access  Private/Admin
const deleteCoupon = asyncHandler(async (req, res, next) => {
  // Check if coupon exists
  if (!(await Coupon.findOne({ _id: req.params.id }))) {
    res.status(404);
    throw new Error("Coupon not found.");
  }

  await Coupon.deleteOne({ _id: req.params.id });
  res.status(200).json({ status: "success", message: "Coupon removed successfully." });
});

module.exports = { createCoupon, getCoupons, getCoupon, deleteCoupon };
