import { Link } from "react-router-dom";
import { HiOutlineShoppingCart, HiStar } from "react-icons/hi2";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault(); // prevent navigating to product details
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }
    addToCart(product._id);
  };

  // Build the image URL
  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `http://localhost:5000${product.image}`
    : "https://via.placeholder.com/300x300?text=No+Image";

  return (
    <Link to={`/product/${product._id}`} className="card group overflow-hidden">
      {/* Image */}
      <div className="relative overflow-hidden aspect-square bg-gray-50">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Out of Stock
            </span>
          </div>
        )}
        {product.stock > 0 && product.stock <= 5 && (
          <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            Only {product.stock} left
          </span>
        )}
      </div>

      {/* Details */}
      <div className="p-4">
        {/* Category */}
        <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
          {product.category}
        </span>

        {/* Name */}
        <h3 className="mt-2 text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1.5">
          {[...Array(5)].map((_, i) => (
            <HiStar
              key={i}
              className={`text-sm ${
                i < Math.round(product.ratings)
                  ? "text-yellow-400"
                  : "text-gray-200"
              }`}
            />
          ))}
          <span className="text-xs text-gray-400 ml-1">({product.ratings})</span>
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-gray-900">
            ₹{product.price?.toLocaleString("en-IN")}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700
                       disabled:bg-gray-300 disabled:cursor-not-allowed
                       transition-colors duration-200 active:scale-95"
          >
            <HiOutlineShoppingCart className="text-lg" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
