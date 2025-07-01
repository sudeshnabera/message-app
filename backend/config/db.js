import mongoose from "mongoose";

//database connection
export const connectDB = async () => {
   try {
    await mongoose.connect("mongodb+srv://sudeshnabera976:Sudeshna2266@cluster0.yl9qhsh.mongodb.net/web-chat", {
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
  }
}
