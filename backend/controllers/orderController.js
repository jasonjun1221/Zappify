const asyncHandler = require("../utils/asyncHandler.js");
const Order = require("../models/orderModel.js");

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const { cartItems, checkoutInfo, paymentMethod, coupon } = req.body;

  if (!cartItems || !checkoutInfo || !paymentMethod) {
    res.status(400);
    throw new Error("All fields are required.");
  }

  // Create order items
  const orderItems = cartItems.map((item) => ({ name: item.name, quantity: item.cartQuantity, price: item.price, product: item._id }));

  // Calculate order amount
  let orderAmount = cartItems.reduce((acc, item) => acc + item.cartQuantity * item.price, 0);

  // Apply coupon discount
  if (coupon) {
    orderAmount = orderAmount - (orderAmount * coupon.discount) / 100;
  }

  await Order.create({
    user: {
      _id: req.user._id,
      name: checkoutInfo.name,
      email: checkoutInfo.email,
      phone: checkoutInfo.phone,
    },
    orderItems,
    orderAmount: orderAmount.toFixed(2),
    shippingAddress: `${checkoutInfo.street}, ${checkoutInfo.postalCode}, ${checkoutInfo.country}`,
    paymentMethod,
    orderNote: checkoutInfo.orderNote,
  });
  res.status(201).json({ status: "success", message: "Order created successfully." });
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  // Check if user is admin
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
  // Check if order exists
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found.");
  }

  // Check if user is admin or order belongs to user
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
  // Check if order exists
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found.");
  }

  // Check if order status is provided
  if (!req.body.orderStatus) {
    res.status(400);
    throw new Error("Order status is required.");
  }

  await Order.findByIdAndUpdate(req.params.id, { orderStatus: req.body.orderStatus }, { new: true, runValidators: true });
  res.status(200).json({ status: "success", message: "Order updated successfully." });
});

module.exports = { createOrder, getAllOrders, getMyOrders, getOrderById, updateOrder };
