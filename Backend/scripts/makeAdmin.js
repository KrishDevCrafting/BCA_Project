// One-time script to make a user an admin
// Run: node scripts/makeAdmin.js
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");

const makeAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const user = await User.findOneAndUpdate(
      { email: "admin@shopkart.com" },
      { role: "admin" },
      { new: true }
    );
    if (user) {
      console.log(`✅ ${user.name} (${user.email}) is now an ADMIN!`);
    } else {
      console.log("❌ User not found");
    }
    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

makeAdmin();
