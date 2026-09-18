import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/axiosInstance";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { HiStar, HiOutlineShoppingCart, HiOutlineTruck, HiOutlineShieldCheck, HiOutlineArrowUturnLeft, HiArrowLeft } from "react-icons/hi2";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => { fetchProduct(); }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      toast.error("Product not found");
      navigate("/");
    } finally { setLoading(false); }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) { toast.error("Please login first"); navigate("/login"); return; }
    addToCart(product._id, quantity);
  };

  if (loading) return <Loader />;
  if (!product) return null;

  const imageUrl = product.image
    ? (product.image.startsWith("http") ? product.image : `http://localhost:5000${product.image}`)
    : "https://via.placeholder.com/600x600?text=No+Image";

  return (
    <div className="page-container animate-fadeIn">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-primary-600 mb-6">
        <HiArrowLeft /><span className="text-sm font-medium">Back</span>
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="bg-gray-50 rounded-2xl overflow-hidden aspect-square">
          <img src={imageUrl} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col">
          <span className="inline-block w-fit text-xs font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full mb-3">{product.category}</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <HiStar key={i} className={`text-lg ${i < Math.round(product.ratings) ? "text-yellow-400" : "text-gray-200"}`} />)}</div>
            <span className="text-sm text-gray-500">({product.ratings})</span>
          </div>
          <div className="mb-6">
            <span className="text-3xl font-extrabold text-gray-900">₹{product.price?.toLocaleString("en-IN")}</span>
            <span className="text-sm text-gray-400 ml-2">(Incl. taxes)</span>
          </div>
          <div className="mb-6"><h3 className="text-sm font-semibold text-gray-700 mb-2">Description</h3><p className="text-gray-600 text-sm leading-relaxed">{product.description}</p></div>
          <div className="mb-6">{product.stock > 0 ? <span className="badge-success">✓ In Stock ({product.stock})</span> : <span className="badge-danger">✗ Out of Stock</span>}</div>
          {product.stock > 0 && (
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 text-gray-600 hover:bg-gray-50">−</button>
                <span className="px-4 py-2 font-medium border-x border-gray-200 min-w-[3rem] text-center">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="px-3 py-2 text-gray-600 hover:bg-gray-50">+</button>
              </div>
              <button onClick={handleAddToCart} className="btn-primary flex items-center gap-2 flex-1"><HiOutlineShoppingCart className="text-lg" />Add to Cart</button>
            </div>
          )}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
            <div className="text-center"><HiOutlineTruck className="text-2xl text-primary-600 mx-auto mb-1" /><p className="text-xs text-gray-500">Free Delivery</p></div>
            <div className="text-center"><HiOutlineShieldCheck className="text-2xl text-primary-600 mx-auto mb-1" /><p className="text-xs text-gray-500">Secure Payment</p></div>
            <div className="text-center"><HiOutlineArrowUturnLeft className="text-2xl text-primary-600 mx-auto mb-1" /><p className="text-xs text-gray-500">Easy Returns</p></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
