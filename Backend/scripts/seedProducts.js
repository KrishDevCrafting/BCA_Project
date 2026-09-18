// One-time script to seed sample products
// Run: node scripts/seedProducts.js
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/Product");

const sampleProducts = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "Premium noise-cancelling wireless headphones with 30-hour battery life. Deep bass, crystal clear sound, and comfortable over-ear design perfect for music lovers.",
    price: 2499,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    stock: 25,
    ratings: 4.5,
  },
  {
    name: "Men's Casual Slim Fit T-Shirt",
    description: "Comfortable cotton blend t-shirt with modern slim fit design. Available in multiple colors. Perfect for everyday casual wear.",
    price: 599,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    stock: 50,
    ratings: 4.2,
  },
  {
    name: "The Compound Effect by Darren Hardy",
    description: "Bestselling book about how small everyday decisions will either take you to the life you desire or to disaster by default. A must-read for personal growth.",
    price: 299,
    category: "Books",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
    stock: 30,
    ratings: 4.8,
  },
  {
    name: "Smart Watch Pro X",
    description: "Feature-packed smartwatch with heart rate monitor, GPS, sleep tracking, and 7-day battery life. Water resistant up to 50 meters.",
    price: 3999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    stock: 15,
    ratings: 4.3,
  },
  {
    name: "Women's Floral Summer Dress",
    description: "Beautiful floral print summer dress with lightweight breathable fabric. Perfect for parties, outings, and casual occasions.",
    price: 1299,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400",
    stock: 20,
    ratings: 4.6,
  },
  {
    name: "Yoga Mat Premium 6mm",
    description: "Non-slip premium yoga mat with 6mm thickness for maximum comfort. Eco-friendly material, easy to clean, includes carrying strap.",
    price: 899,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400",
    stock: 35,
    ratings: 4.4,
  },
  {
    name: "USB-C Fast Charger 65W",
    description: "Universal 65W USB-C fast charger compatible with laptops, phones, and tablets. GaN technology for compact size and cool operation.",
    price: 1599,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400",
    stock: 40,
    ratings: 4.1,
  },
  {
    name: "Ceramic Coffee Mug Set (4 pcs)",
    description: "Elegant ceramic coffee mug set of 4. Microwave and dishwasher safe. Perfect for home, office, or gifting.",
    price: 749,
    category: "Home",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400",
    stock: 18,
    ratings: 4.7,
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Product.deleteMany({});
    const created = await Product.insertMany(sampleProducts);
    console.log(`✅ ${created.length} sample products added successfully!`);
    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

seedProducts();
