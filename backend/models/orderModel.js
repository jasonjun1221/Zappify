const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: {
      type: String,
      required: true,
    },
    // orderItems: [
    //     {
    //       name: { type: String, required: true },
    //       quantity: { type: Number, required: true },
    //       price: { type: Number, required: true },
    //       product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
    //     },
    //   ],
    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    orderAmount: {
      type: Number,
      required: true,
      default: 0.0,
    },
    orderDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
