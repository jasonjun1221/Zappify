const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      unqiue: true,
      required: [true, "Please enter category name."],
      trim: true,
      minlenght: [3, "Category name too short."],
      maxLength: [20, "Category name too long."],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
