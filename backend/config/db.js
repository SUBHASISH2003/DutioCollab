import mongoose from "mongoose";

let isConnected = false; // To prevent multiple connections (esp. in serverless)

export const connection = async () => {
  if (isConnected) {
    console.log("🟢 Using existing MongoDB connection.");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "WorkHive",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("✅ MongoDB connected.");
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit to avoid running a broken app
  }
};
