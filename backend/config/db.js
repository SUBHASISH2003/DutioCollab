// utils/db.js
import mongoose from "mongoose";
import { config } from "dotenv";
config({ path: ".env" });
let isConnected = false;

export const connection = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGO_URI);

    isConnected = true;
    console.log("✅ Connected to database.");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
};
