const express = require("express");
const router = express.Router();
const { createOrder, getAllOrders, getMyOrders, getOrderById, updateOrder } = require("../controllers/orderController");
const { protect, admin } = require("../middlewares/authMiddleware");

router.post("/", protect, createOrder);
router.get("/", protect, admin, getAllOrders);
router.get("/myorders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id", protect, admin, updateOrder);

module.exports = router;
