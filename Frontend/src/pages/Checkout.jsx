import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import API from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { HiOutlineMapPin, HiOutlineCreditCard } from "react-icons/hi2";

const Checkout = () => {
  const { cartItems, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({ street: "", city: "", state: "", pincode: "" });
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const handleChange = (e) => setAddress({ ...address, [e.target.name]: e.target.value });

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!address.street || !address.city || !address.state || !address.pincode) {
      toast.error("Please fill complete address"); return;
    }
    try {
      setLoading(true);
      await API.post("/orders/place", { shippingAddress: address, paymentMethod });
      toast.success("Order placed successfully! 🎉");
      navigate("/orders");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally { setLoading(false); }
  };

  if (cartItems.length === 0) { navigate("/cart"); return null; }

  return (
    <div className="page-container animate-fadeIn">
      <h1 className="section-title mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handlePlaceOrder} className="space-y-6">
            {/* Shipping Address */}
            <div className="card p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><HiOutlineMapPin className="text-primary-600" />Shipping Address</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label><input name="street" value={address.street} onChange={handleChange} placeholder="123, Main Street" className="input-field" required /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">City</label><input name="city" value={address.city} onChange={handleChange} placeholder="New Delhi" className="input-field" required /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">State</label><input name="state" value={address.state} onChange={handleChange} placeholder="Delhi" className="input-field" required /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label><input name="pincode" value={address.pincode} onChange={handleChange} placeholder="110001" className="input-field" required /></div>
              </div>
            </div>
            {/* Payment Method */}
            <div className="card p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><HiOutlineCreditCard className="text-primary-600" />Payment Method</h3>
              <div className="space-y-3">
                <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === "COD" ? "border-primary-500 bg-primary-50" : "border-gray-200 hover:border-gray-300"}`}>
                  <input type="radio" name="payment" value="COD" checked={paymentMethod === "COD"} onChange={(e) => setPaymentMethod(e.target.value)} className="accent-primary-600" />
                  <div><p className="font-medium text-gray-900">Cash on Delivery</p><p className="text-xs text-gray-500">Pay when you receive your order</p></div>
                </label>
                <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === "Online" ? "border-primary-500 bg-primary-50" : "border-gray-200 hover:border-gray-300"}`}>
                  <input type="radio" name="payment" value="Online" checked={paymentMethod === "Online"} onChange={(e) => setPaymentMethod(e.target.value)} className="accent-primary-600" />
                  <div><p className="font-medium text-gray-900">Online Payment</p><p className="text-xs text-gray-500">Pay securely online</p></div>
                </label>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full !py-3 flex items-center justify-center gap-2 disabled:opacity-60">
              {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>Placing Order...</> : `Place Order • ₹${totalAmount?.toLocaleString("en-IN")}`}
            </button>
          </form>
        </div>
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Order Items ({cartItems.length})</h3>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-3">
                  <img src={item.productId.image ? (item.productId.image.startsWith("http") ? item.productId.image : `http://localhost:5000${item.productId.image}`) : "https://via.placeholder.com/60"} alt="" className="w-12 h-12 object-cover rounded-lg bg-gray-50" />
                  <div className="flex-1 min-w-0"><p className="text-sm font-medium text-gray-900 truncate">{item.productId.name}</p><p className="text-xs text-gray-500">Qty: {item.quantity}</p></div>
                  <span className="text-sm font-semibold">₹{(item.productId.price * item.quantity).toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>
            <div className="border-t mt-4 pt-4 flex justify-between"><span className="font-semibold">Total</span><span className="text-xl font-bold">₹{totalAmount?.toLocaleString("en-IN")}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
