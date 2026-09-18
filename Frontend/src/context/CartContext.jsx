import { createContext, useContext, useState, useEffect } from "react";
import API from "../utils/axiosInstance";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [cartLoading, setCartLoading] = useState(false);

  // Fetch cart when user logs in
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCartItems([]);
      setTotalAmount(0);
    }
  }, [isAuthenticated]);

  // Get cart from backend
  const fetchCart = async () => {
    try {
      setCartLoading(true);
      const res = await API.get("/cart");
      setCartItems(res.data.items || []);
      setTotalAmount(res.data.totalAmount || 0);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setCartLoading(false);
    }
  };

  // Add to cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      await API.post("/cart/add", { productId, quantity });
      await fetchCart(); // refresh cart
      toast.success("Added to cart! 🛒");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart");
    }
  };

  // Update quantity
  const updateQuantity = async (itemId, quantity) => {
    try {
      await API.put(`/cart/update/${itemId}`, { quantity });
      await fetchCart();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update quantity");
    }
  };

  // Remove item
  const removeItem = async (itemId) => {
    try {
      await API.delete(`/cart/remove/${itemId}`);
      await fetchCart();
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove item");
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      await API.delete("/cart/clear");
      setCartItems([]);
      setTotalAmount(0);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const value = {
    cartItems,
    totalAmount,
    cartLoading,
    cartCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
