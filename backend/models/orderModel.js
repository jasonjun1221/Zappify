const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      _id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    orderItems: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    orderStatus: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },
    orderAmount: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      default: "cash-on-delivery",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
