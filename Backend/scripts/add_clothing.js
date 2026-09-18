require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/Product");

const newClothing = [
  {
    name: "Men's Premium Biker Leather Jacket",
    description: "100% genuine top-grain black leather jacket with heavy-duty asymmetrical metal zippers. Features quilted inner lining, adjustable waist buckles, and multiple secure pockets. Ultimate timeless rugged style.",
    price: 4999,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
    stock: 10,
    ratings: 4.9,
  },
  {
    name: "Women's Cozy Cable-Knit Sweater",
    description: "Ultra-soft organic cotton and wool blend sweater with elegant cable-knit pattern, relaxed turtleneck, and cozy drop-shoulder style. Extremely warm, breathable, and perfect for aesthetic winter layers.",
    price: 1899,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400",
    stock: 15,
    ratings: 4.7,
  },
  {
    name: "Unisex Retro Wide-Leg Cargo Pants",
    description: "Heavyweight premium cotton canvas streetwear cargo trousers featuring six deep utility tactical pockets, elastic drawstring waist, and adjustable ankle ties. Engineered for modern casual street outfits.",
    price: 2299,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400",
    stock: 20,
    ratings: 4.5,
  }
];

const insertData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB Atlas to inject fresh clothing data...");
    
    // Insert new clothing products
    const inserted = await Product.insertMany(newClothing);
    console.log(`✅ Successfully added ${inserted.length} high-end premium clothing items!`);
    
    const count = await Product.countDocuments({ category: "Clothing" });
    console.log(`👕 Total items in Clothing category now: ${count}`);
    
    process.exit(0);
  } catch (err) {
    console.error("Error inserting clothing data:", err.message);
    process.exit(1);
  }
};

insertData();
