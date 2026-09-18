import { useState, useEffect } from "react";
import API from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const STATUSES = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
const statusColors = { Pending: "badge-warning", Processing: "badge-info", Shipped: "badge-info", Delivered: "badge-success", Cancelled: "badge-danger" };

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data.orders);
    } catch (error) { console.error(error); }
    finally { setLoading(false); }
  };

  const updateStatus = async (orderId, status) => {
    try {
      await API.put(`/orders/${orderId}/status`, { status });
      toast.success(`Status updated to "${status}"`);
      fetchOrders();
    } catch (error) { toast.error("Failed to update"); }
  };

  return (
    <div className="page-container animate-fadeIn">
      <h1 className="section-title mb-8">Manage Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="card p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div><p className="text-xs text-gray-400">Order ID</p><p className="text-sm font-mono font-medium">#{order._id.slice(-8).toUpperCase()}</p></div>
              <div><p className="text-xs text-gray-400">Customer</p><p className="text-sm font-medium">{order.userId?.name} ({order.userId?.email})</p></div>
              <div><p className="text-xs text-gray-400">Total</p><p className="text-sm font-bold">₹{order.totalAmount?.toLocaleString("en-IN")}</p></div>
              <div><p className="text-xs text-gray-400">Payment</p><p className="text-sm">{order.paymentMethod} ({order.paymentStatus})</p></div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Status</p>
                <select value={order.status} onChange={(e) => updateStatus(order._id, e.target.value)} className="text-sm border border-gray-200 rounded-lg px-2 py-1 focus:ring-2 focus:ring-primary-500 outline-none">
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="border-t pt-3 text-xs text-gray-500">
              {order.items.length} item(s) • {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} • Ship to: {order.shippingAddress?.city}, {order.shippingAddress?.state}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageOrders;
