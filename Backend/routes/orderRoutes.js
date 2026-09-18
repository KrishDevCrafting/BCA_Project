const express = require("express");
const router = express.Router();
const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const verifyToken = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// User routes (private)
router.post("/place", verifyToken, placeOrder);
router.get("/my-orders", verifyToken, getMyOrders);

// Admin routes
router.get("/", verifyToken, adminMiddleware, getAllOrders);
router.put("/:id/status", verifyToken, adminMiddleware, updateOrderStatus);

module.exports = router;
