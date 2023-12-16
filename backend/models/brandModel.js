const mongoose = require("mongoose");

const brandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unqiue: true,
      required: [true, "Please enter brand name."],
      trim: true,
      minLength: [2, "Brand name too short."],
      maxLength: [20, "Brand name too long."],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    category: {
      type: String,
      required: [true, "Please select a category for this brand."],
    },
  },
  { timestamps: true }
);

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
