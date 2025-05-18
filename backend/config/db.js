// utils/db.js
import mongoose from "mongoose";

let isConnected = false;

export const connection = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://codingsaikat:saikat123@cluster0.fgfcsxr.mongodb.net/", {
      dbName: "WorkHive",
    });

    isConnected = true;
    console.log("✅ Connected to database.");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
};
