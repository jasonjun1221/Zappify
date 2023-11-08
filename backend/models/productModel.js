const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    index: true,
  },
  name: {
    type: String,
  },
  rating: {
    type: Number,
    required: [true, "Please enter your rating."],
    minlength: [1, "Rating must be at least 1."],
    maxlength: [5, "Rating must not exceed 5."],
  },
  comment: {
    type: String,
    required: [true, "Please enter your comment."],
  },
  date: {
    type: Date,
  },
});

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name."],
    },
    category: {
      type: String,
      required: [true, "Please enter product category."],
    },
    brand: {
      type: String,
      required: [true, "Please enter product brand."],
    },
    price: {
      type: Number,
      required: [true, "Please enter product price."],
    },
    description: {
      type: String,
      required: [true, "Please enter product description."],
    },
    quantity: {
      type: Number,
      required: [true, "Please enter product quantity."],
    },
    image: {
      type: String,
      default: "/images/sample.jpg",
    },
    reviews: {
      type: [reviewSchema],
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
