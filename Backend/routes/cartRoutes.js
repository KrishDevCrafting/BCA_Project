const express = require("express");
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");
const verifyToken = require("../middleware/authMiddleware");

// All cart routes are private (require login)
router.get("/", verifyToken, getCart);
router.post("/add", verifyToken, addToCart);
router.put("/update/:itemId", verifyToken, updateCartItem);
router.delete("/remove/:itemId", verifyToken, removeFromCart);
router.delete("/clear", verifyToken, clearCart);

module.exports = router;
