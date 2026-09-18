import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Loader from "../components/Loader";
import { HiOutlineTrash, HiOutlinePlus, HiOutlineMinus, HiArrowLeft, HiOutlineShoppingBag } from "react-icons/hi2";

const Cart = () => {
  const { cartItems, totalAmount, cartLoading, updateQuantity, removeItem } = useCart();

  if (cartLoading) return <Loader />;

  return (
    <div className="page-container animate-fadeIn">
      <h1 className="section-title mb-8">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-20">
          <HiOutlineShoppingBag className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-500 mb-6">Add some products to get started!</p>
          <Link to="/" className="btn-primary">Continue Shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const product = item.productId;
              const imageUrl = product.image
                ? (product.image.startsWith("http") ? product.image : `http://localhost:5000${product.image}`)
                : "https://via.placeholder.com/100x100?text=No+Image";
              return (
                <div key={item._id} className="card p-4 flex gap-4 animate-fadeIn">
                  <img src={imageUrl} alt={product.name} className="w-24 h-24 object-cover rounded-lg bg-gray-50 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${product._id}`} className="text-sm font-semibold text-gray-900 hover:text-primary-600 line-clamp-2">{product.name}</Link>
                    <p className="text-lg font-bold text-gray-900 mt-1">₹{product.price?.toLocaleString("en-IN")}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))} className="p-1.5 text-gray-600 hover:bg-gray-50"><HiOutlineMinus className="text-sm" /></button>
                        <span className="px-3 py-1 text-sm font-medium border-x border-gray-200">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="p-1.5 text-gray-600 hover:bg-gray-50"><HiOutlinePlus className="text-sm" /></button>
                      </div>
                      <button onClick={() => removeItem(item._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><HiOutlineTrash className="text-lg" /></button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span><span className="font-medium">₹{totalAmount?.toLocaleString("en-IN")}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Delivery</span><span className="font-medium text-green-600">Free</span></div>
                <div className="border-t pt-3 flex justify-between"><span className="font-semibold text-gray-900">Total</span><span className="text-xl font-bold text-gray-900">₹{totalAmount?.toLocaleString("en-IN")}</span></div>
              </div>
              <Link to="/checkout" className="btn-primary w-full text-center block">Proceed to Checkout</Link>
              <Link to="/" className="flex items-center justify-center gap-2 mt-3 text-sm text-gray-500 hover:text-primary-600"><HiArrowLeft className="text-sm" />Continue Shopping</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
