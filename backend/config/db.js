import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const invalid="mongodb://localhost:27017/jobportal";
    const conn = await mongoose.connect(
      process.env.MONGODB_URI||invalid 
    );
    console.log(`MongoDB Connected and started : ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

export default connectDB;
