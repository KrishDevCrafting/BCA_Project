import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/axiosInstance";
import { HiOutlineCube, HiOutlineShoppingCart, HiOutlineUsers, HiOutlineCurrencyRupee } from "react-icons/hi2";

const Dashboard = () => {
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => { fetchStats(); }, []);

  const fetchStats = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        API.get("/products"),
        API.get("/orders"),
      ]);
      const orders = ordersRes.data.orders;
      const revenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
      setStats({ products: productsRes.data.count, orders: orders.length, revenue });
      setRecentOrders(orders.slice(0, 5));
    } catch (error) { console.error("Error:", error); }
  };

  const statCards = [
    { label: "Products", value: stats.products, icon: HiOutlineCube, color: "bg-blue-500" },
    { label: "Orders", value: stats.orders, icon: HiOutlineShoppingCart, color: "bg-green-500" },
    { label: "Revenue", value: `₹${stats.revenue.toLocaleString("en-IN")}`, icon: HiOutlineCurrencyRupee, color: "bg-purple-500" },
  ];

  return (
    <div className="page-container animate-fadeIn">
      <div className="flex items-center justify-between mb-8">
        <h1 className="section-title">Admin Dashboard</h1>
        <div className="flex gap-3">
          <Link to="/admin/products" className="btn-primary text-sm">Manage Products</Link>
          <Link to="/admin/orders" className="btn-secondary text-sm">Manage Orders</Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {statCards.map((s) => (
          <div key={s.label} className="card p-6 flex items-center gap-4">
            <div className={`${s.color} p-3 rounded-xl text-white`}><s.icon className="text-2xl" /></div>
            <div><p className="text-sm text-gray-500">{s.label}</p><p className="text-2xl font-bold text-gray-900">{s.value}</p></div>
          </div>
        ))}
      </div>
      <div className="card p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Orders</h3>
        {recentOrders.length === 0 ? <p className="text-gray-500 text-sm">No orders yet</p> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b"><th className="text-left py-3 px-2 text-gray-500 font-medium">Order ID</th><th className="text-left py-3 px-2 text-gray-500 font-medium">Customer</th><th className="text-left py-3 px-2 text-gray-500 font-medium">Amount</th><th className="text-left py-3 px-2 text-gray-500 font-medium">Status</th><th className="text-left py-3 px-2 text-gray-500 font-medium">Date</th></tr></thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order._id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-3 px-2 font-mono text-xs">#{order._id.slice(-8).toUpperCase()}</td>
                    <td className="py-3 px-2">{order.userId?.name || "User"}</td>
                    <td className="py-3 px-2 font-semibold">₹{order.totalAmount?.toLocaleString("en-IN")}</td>
                    <td className="py-3 px-2"><span className={`badge ${order.status === "Delivered" ? "badge-success" : order.status === "Cancelled" ? "badge-danger" : "badge-warning"}`}>{order.status}</span></td>
                    <td className="py-3 px-2 text-gray-500">{new Date(order.createdAt).toLocaleDateString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
