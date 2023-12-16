const mongoose = require("mongoose");

const couponSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      uppercase: true,
      required: [true, "Coupon name is required."],
      minLength: [6, "Coupon name must be at least 6 characters long."],
      maxLength: [12, "Coupon name must be at most 12 characters long."],
    },
    expiry: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = Coupon;
