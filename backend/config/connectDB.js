import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    const result = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully".cyan.underline.bold);
  } catch (error) {
    console.log(`ERROR- ${error.message}`.red.underline.bold);
  }
};
