import { useState, useEffect } from "react";
import API from "../utils/axiosInstance";
import Loader from "../components/Loader";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Link } from "react-router-dom";

const statusColors = {
  Pending: "badge-warning",
  Processing: "badge-info",
  Shipped: "badge-info",
  Delivered: "badge-success",
  Cancelled: "badge-danger",
};

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/my-orders");
      setOrders(res.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally { setLoading(false); }
  };

  if (loading) return <Loader />;

  return (
    <div className="page-container animate-fadeIn">
      <h1 className="section-title mb-8">My Orders</h1>
      {orders.length === 0 ? (
        <div className="text-center py-20">
          <HiOutlineShoppingBag className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-500 mb-6">Start shopping to see your orders here!</p>
          <Link to="/" className="btn-primary">Shop Now</Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="card p-6 animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-400">Order ID</p>
                  <p className="text-sm font-mono font-medium text-gray-700">#{order._id.slice(-8).toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Date</p>
                  <p className="text-sm font-medium">{new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Total</p>
                  <p className="text-sm font-bold">₹{order.totalAmount?.toLocaleString("en-IN")}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Payment</p>
                  <p className="text-sm font-medium">{order.paymentMethod}</p>
                </div>
                <span className={statusColors[order.status] || "badge-info"}>{order.status}</span>
              </div>
              <div className="border-t pt-4 space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <img src={item.productId?.image ? (item.productId.image.startsWith("http") ? item.productId.image : `http://localhost:5000${item.productId.image}`) : "https://via.placeholder.com/48"} alt="" className="w-12 h-12 object-cover rounded-lg bg-gray-50" />
                    <div className="flex-1 min-w-0"><p className="text-sm font-medium text-gray-900 truncate">{item.productId?.name || "Product"}</p><p className="text-xs text-gray-500">Qty: {item.quantity} × ₹{item.price?.toLocaleString("en-IN")}</p></div>
                    <span className="text-sm font-semibold">₹{(item.quantity * item.price).toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>
              <div className="border-t mt-4 pt-3">
                <p className="text-xs text-gray-400">Shipping: {order.shippingAddress?.street}, {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
