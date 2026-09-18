import { Link } from "react-router-dom";
import { HiShoppingBag } from "react-icons/hi2";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <HiShoppingBag className="text-3xl text-primary-400" />
              <span className="text-xl font-bold text-white tracking-tight">
                Shop<span className="text-primary-400">Kart</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Your one-stop destination for quality products at the best prices.
              Shop with confidence — fast delivery, secure payments, and easy returns.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-primary-400 transition-colors">Home</Link></li>
              <li><Link to="/cart" className="hover:text-primary-400 transition-colors">Cart</Link></li>
              <li><Link to="/orders" className="hover:text-primary-400 transition-colors">My Orders</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>📧 support@shopkart.com</li>
              <li>📞 +91 98765 43210</li>
              <li>📍 New Delhi, India</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} ShopKart. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Built with ❤️ by <span className="text-primary-400 font-medium">Krish</span> — IGNOU BCA Project
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
