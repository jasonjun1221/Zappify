const asyncHandler = require("../utils/asyncHandler.js");
const Order = require("../models/orderModel.js");

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, orderStatus, orderAmount, shippingAddress, paymentMethod, orderDate } = req.body;

  if (!orderItems || !orderStatus || !orderAmount || !shippingAddress || !paymentMethod || !orderDate) {
    res.status(400);
    throw new Error("Please enter all fields.");
  }

  await Order.create({ user: req.user._id, orderItems, orderStatus, orderAmount, shippingAddress, paymentMethod, orderDate });
  res.status(201).json({ status: "success", message: "Order created successfully." });
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(401);
    throw new Error("Not authorized as an admin.");
  }

  const orders = await Order.find({}).sort({ createdAt: -1 });
  res.status(200).json({ status: "success", orders });
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json({ status: "success", orders });
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found.");
  }

  if (!req.user.isAdmin && order.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to view this order.");
  }
  res.status(200).json({ status: "success", order });
});

// @desc    Update order
// @route   PUT /api/orders/:id
// @access  Private/Admin
const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found.");
  }

  await Order.findByIdAndUpdate(req.params.id, { orderStatus: req.body.orderStatus }, { new: true, runValidators: true });
  res.status(200).json({ status: "success", message: "Order updated successfully." });
});

module.exports = { createOrder, getAllOrders, getMyOrders, getOrderById, updateOrder };
