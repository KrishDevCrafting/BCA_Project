// Seed more products into ShopKart
// Run: node scripts/seedMore.js
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/Product");

const moreProducts = [
  // ── Electronics ────────────────────────────
  {
    name: "Apple AirPods Pro (2nd Gen)",
    description: "Active noise cancellation, adaptive transparency, personalized spatial audio. MagSafe charging case with USB-C. Up to 6 hours listening time.",
    price: 24999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400",
    stock: 12,
    ratings: 4.8,
  },
  {
    name: "Portable Bluetooth Speaker",
    description: "360° surround sound portable speaker with 12-hour battery. IPX7 waterproof, perfect for outdoor adventures and pool parties.",
    price: 1999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
    stock: 22,
    ratings: 4.3,
  },
  {
    name: "Mechanical Gaming Keyboard RGB",
    description: "Full-size mechanical keyboard with Cherry MX switches. Per-key RGB backlighting, aluminum frame, detachable wrist rest.",
    price: 4499,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400",
    stock: 18,
    ratings: 4.6,
  },
  {
    name: "Wireless Mouse Ergonomic",
    description: "Ergonomic vertical wireless mouse with 2.4GHz connectivity. 6 buttons, adjustable DPI up to 2400. Reduces wrist strain.",
    price: 799,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
    stock: 30,
    ratings: 4.2,
  },
  {
    name: "Power Bank 20000mAh",
    description: "Slim portable power bank with 20000mAh capacity. Dual USB output, USB-C input, LED indicator. Charges 3 devices simultaneously.",
    price: 1299,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400",
    stock: 45,
    ratings: 4.4,
  },

  // ── Clothing ───────────────────────────────
  {
    name: "Men's Denim Jacket Classic",
    description: "Classic fit denim jacket with button closure. Washed blue finish, two chest pockets. Perfect layering piece for all seasons.",
    price: 2199,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400",
    stock: 15,
    ratings: 4.5,
  },
  {
    name: "Women's Running Sneakers",
    description: "Lightweight breathable running shoes with cushioned sole. Mesh upper for ventilation, anti-slip rubber outsole. Available in 5 colors.",
    price: 2499,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    stock: 28,
    ratings: 4.7,
  },
  {
    name: "Unisex Hoodie - Oversized Fit",
    description: "Premium cotton blend oversized hoodie. Kangaroo pocket, adjustable drawstring hood. Super comfortable for lounging and streetwear.",
    price: 1599,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
    stock: 35,
    ratings: 4.4,
  },
  {
    name: "Men's Formal Shirt - White",
    description: "Crisp white formal shirt with regular fit. Wrinkle-free cotton fabric, button-down collar. Perfect for office and occasions.",
    price: 999,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736c10?w=400",
    stock: 40,
    ratings: 4.1,
  },
  {
    name: "Women's Leather Handbag",
    description: "Elegant faux leather handbag with gold-tone hardware. Multiple compartments, detachable shoulder strap. Ideal for work and travel.",
    price: 1899,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400",
    stock: 10,
    ratings: 4.6,
  },

  // ── Books ──────────────────────────────────
  {
    name: "Think and Grow Rich - Napoleon Hill",
    description: "The timeless classic on personal success and wealth creation. One of the best-selling self-help books of all time. A must-read masterpiece.",
    price: 199,
    category: "Books",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
    stock: 50,
    ratings: 4.9,
  },
  {
    name: "The Alchemist - Paulo Coelho",
    description: "A magical story about Santiago, a shepherd boy who dreams of discovering treasure. An inspiring tale about following your dreams.",
    price: 249,
    category: "Books",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400",
    stock: 40,
    ratings: 4.7,
  },
  {
    name: "Atomic Habits - James Clear",
    description: "Proven framework for improving every day. Learn how tiny changes in habits can lead to remarkable results. #1 NYT Bestseller.",
    price: 349,
    category: "Books",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400",
    stock: 35,
    ratings: 4.8,
  },

  // ── Home ───────────────────────────────────
  {
    name: "LED Desk Lamp with Wireless Charger",
    description: "Modern LED desk lamp with built-in wireless charging pad. 5 brightness levels, 3 color modes. Touch control with memory function.",
    price: 1899,
    category: "Home",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400",
    stock: 16,
    ratings: 4.5,
  },
  {
    name: "Indoor Plant Pot Set (3 pcs)",
    description: "Minimalist ceramic plant pot set in 3 sizes. Drainage holes with bamboo saucers. Perfect for succulents and small indoor plants.",
    price: 899,
    category: "Home",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400",
    stock: 20,
    ratings: 4.3,
  },
  {
    name: "Scented Candle Gift Set",
    description: "Luxury scented candle set of 4 — Lavender, Vanilla, Rose & Jasmine. 100% natural soy wax, 25-hour burn time each.",
    price: 699,
    category: "Home",
    image: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=400",
    stock: 25,
    ratings: 4.6,
  },

  // ── Sports ─────────────────────────────────
  {
    name: "Resistance Bands Set (5 pcs)",
    description: "5 resistance levels for full body workout. Latex-free, skin-friendly material. Includes carry bag and exercise guide.",
    price: 499,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400",
    stock: 60,
    ratings: 4.4,
  },
  {
    name: "Stainless Steel Water Bottle 1L",
    description: "Double-wall vacuum insulated water bottle. Keeps drinks cold 24hrs / hot 12hrs. BPA-free, leak-proof lid. Gym & travel essential.",
    price: 599,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400",
    stock: 50,
    ratings: 4.5,
  },
  {
    name: "Adjustable Dumbbell Set 20kg",
    description: "Adjustable dumbbell set with 20kg total weight. Cast iron plates with rubber grip handles. Space-saving home gym solution.",
    price: 3499,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400",
    stock: 8,
    ratings: 4.3,
  },

  // ── Beauty ─────────────────────────────────
  {
    name: "Vitamin C Face Serum 30ml",
    description: "Brightening face serum with 20% Vitamin C, Hyaluronic Acid & Vitamin E. Reduces dark spots, boosts collagen. Dermatologist tested.",
    price: 549,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400",
    stock: 30,
    ratings: 4.6,
  },
  {
    name: "Sunscreen SPF 50+ PA+++",
    description: "Lightweight, non-greasy sunscreen with broad spectrum SPF 50+ protection. Water-resistant, suitable for all skin types. 100ml.",
    price: 399,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400",
    stock: 45,
    ratings: 4.4,
  },
  {
    name: "Hair Dryer Professional 2000W",
    description: "Salon-grade hair dryer with ionic technology. 3 heat settings, 2 speed settings, cool shot button. Lightweight with concentrator nozzle.",
    price: 1799,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1522338242992-e1a54571a9f7?w=400",
    stock: 14,
    ratings: 4.2,
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const created = await Product.insertMany(moreProducts);
    console.log(`✅ ${created.length} MORE products added! Total products in DB now.`);
    const total = await Product.countDocuments();
    console.log(`📦 Total products in database: ${total}`);
    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

seed();
