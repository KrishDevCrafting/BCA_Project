import { useState, useEffect } from "react";
import API from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineXMark } from "react-icons/hi2";

const CATEGORIES = ["Electronics", "Clothing", "Books", "Home", "Sports", "Beauty", "Other"];

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", price: "", category: "Electronics", stock: "", ratings: "0" });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data.products);
    } catch (error) { console.error(error); }
  };

  const resetForm = () => { setForm({ name: "", description: "", price: "", category: "Electronics", stock: "", ratings: "0" }); setImageFile(null); setEditing(null); };

  const openAdd = () => { resetForm(); setShowModal(true); };
  const openEdit = (p) => { setEditing(p._id); setForm({ name: p.name, description: p.description, price: p.price, category: p.category, stock: p.stock, ratings: p.ratings }); setImageFile(null); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      if (imageFile) formData.append("image", imageFile);

      if (editing) {
        await API.put(`/products/${editing}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
        toast.success("Product updated!");
      } else {
        await API.post("/products", formData, { headers: { "Content-Type": "multipart/form-data" } });
        toast.success("Product added!");
      }
      setShowModal(false); resetForm(); fetchProducts();
    } catch (error) { toast.error(error.response?.data?.message || "Failed"); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try { await API.delete(`/products/${id}`); toast.success("Deleted!"); fetchProducts(); }
    catch (error) { toast.error("Failed to delete"); }
  };

  return (
    <div className="page-container animate-fadeIn">
      <div className="flex items-center justify-between mb-8">
        <h1 className="section-title">Manage Products</h1>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2 text-sm"><HiOutlinePlus />Add Product</button>
      </div>
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50"><tr><th className="text-left py-3 px-4 font-medium text-gray-500">Image</th><th className="text-left py-3 px-4 font-medium text-gray-500">Name</th><th className="text-left py-3 px-4 font-medium text-gray-500">Category</th><th className="text-left py-3 px-4 font-medium text-gray-500">Price</th><th className="text-left py-3 px-4 font-medium text-gray-500">Stock</th><th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th></tr></thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4"><img src={p.image ? (p.image.startsWith("http") ? p.image : `http://localhost:5000${p.image}`) : "https://via.placeholder.com/40"} className="w-10 h-10 object-cover rounded" alt="" /></td>
                  <td className="py-3 px-4 font-medium max-w-[200px] truncate">{p.name}</td>
                  <td className="py-3 px-4">{p.category}</td>
                  <td className="py-3 px-4 font-semibold">₹{p.price?.toLocaleString("en-IN")}</td>
                  <td className="py-3 px-4"><span className={p.stock > 0 ? "badge-success" : "badge-danger"}>{p.stock}</span></td>
                  <td className="py-3 px-4"><div className="flex gap-2"><button onClick={() => openEdit(p)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"><HiOutlinePencil /></button><button onClick={() => handleDelete(p._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><HiOutlineTrash /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 animate-slideUp">
            <div className="flex items-center justify-between mb-6"><h3 className="text-lg font-bold">{editing ? "Edit Product" : "Add Product"}</h3><button onClick={() => setShowModal(false)}><HiOutlineXMark className="text-xl text-gray-400" /></button></div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" required /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field" rows={3} required /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label><input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="input-field" required /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Stock</label><input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="input-field" required /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Category</label><select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field">{CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Image</label><input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="input-field text-sm" /></div>
              <button type="submit" disabled={loading} className="btn-primary w-full !py-3 disabled:opacity-60">{loading ? "Saving..." : editing ? "Update Product" : "Add Product"}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
