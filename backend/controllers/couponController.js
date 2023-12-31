const asyncHandler = require("../utils/asyncHandler.js");
const Coupon = require("../models/couponModel.js");
const nodemailer = require("nodemailer");

// @desc    Create a new coupon
// @route   POST /api/coupons
// @access  Private/Admin
const createCoupon = asyncHandler(async (req, res) => {
  const { name, expiry, discount } = req.body;
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
  if (!coupon) {
    res.status(404);
    throw new Error("Coupon not found.");
  }
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
  if (!(await Coupon.findOne({ _id: req.params.id }))) {
    res.status(404);
    throw new Error("Coupon not found.");
  }
  await Coupon.deleteOne({ _id: req.params.id });
  res.status(200).json({ status: "success", message: "Coupon removed successfully." });
});

// @desc    Send coupon to client by email
// @route   POST /api/coupons/send-email
// @access  Private
const sendEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "jasonchong1221@hotmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: "jasonchong1221@hotmail.com",
    to: email,
    subject: "Member Coupon 50%!",
    text: "Coupon: SPECIAL",
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new Error("Email not sent successfully");
    }
    res.status(200).json({ status: "success", message: "Email sent successfully." });
  });
});

module.exports = { createCoupon, getCoupons, getCoupon, deleteCoupon, sendEmail };
