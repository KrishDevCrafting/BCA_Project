import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../utils/axiosInstance";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlineMagnifyingGlass,
  HiOutlineXMark,
} from "react-icons/hi2";

const CATEGORIES = ["All", "Electronics", "Clothing", "Books", "Home", "Sports", "Beauty", "Other"];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortBy, searchQuery]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchQuery) params.search = searchQuery;
      if (selectedCategory !== "All") params.category = selectedCategory;
      if (sortBy) params.sort = sortBy;

      const res = await API.get("/products", { params });
      setProducts(res.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {!searchQuery && (
        <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-400 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
            <div className="max-w-2xl animate-slideUp">
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                🎉 Welcome to ShopKart
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                Discover Amazing
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
                  Products
                </span>
              </h1>
              <p className="text-lg text-white/80 mb-8 max-w-lg">
                Shop the best products at unbeatable prices. Fast delivery, secure payments,
                and hassle-free returns — all in one place.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#products" className="bg-white text-primary-700 font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl active:scale-95">
                  Shop Now
                </a>
                <a href="#products" className="border-2 border-white/40 text-white font-medium px-8 py-3 rounded-xl hover:bg-white/10 transition-all">
                  Browse All
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
      <section id="products" className="page-container">
        {/* Search Results Header */}
        {searchQuery && (
          <div className="flex items-center gap-3 mb-6 animate-fadeIn">
            <HiOutlineMagnifyingGlass className="text-xl text-gray-400" />
            <h2 className="text-lg text-gray-600">
              Results for "<span className="font-semibold text-gray-900">{searchQuery}</span>"
            </h2>
            <button
              onClick={() => setSearchParams({})}
              className="flex items-center justify-center p-1 bg-red-50 hover:bg-red-100 text-red-500 rounded-full transition-colors cursor-pointer"
              title="Clear Search"
            >
              <HiOutlineXMark className="text-base" />
            </button>
          </div>
        )}

        {/* Filters Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                  ${
                    selectedCategory === cat
                      ? "bg-primary-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <HiOutlineAdjustmentsHorizontal className="text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700
                         focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
            >
              <option value="">Newest First</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <Loader />
        ) : products.length === 0 ? (
          <div className="text-center py-20 animate-fadeIn">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            {selectedCategory !== "All" && (
              <button
                onClick={() => setSelectedCategory("All")}
                className="mt-4 btn-secondary text-sm"
              >
                <HiOutlineXMark className="inline mr-1" /> Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-4">
              Showing <span className="font-semibold text-gray-700">{products.length}</span> products
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 stagger-children">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Home;
