import bcrypt from "bcrypt";
import connectDB from "../config/db.js";
import User from "../models/usermodel.js";
import dotenv from "dotenv";
dotenv.config();

const AdminSeeder = async () => {
  try {
    await connectDB();

    const adminexist = await User.findOne({ role: "admin" });

    if (adminexist) {
      console.log(" Admin already exists");
    } else {
      const hashedPassword = await bcrypt.hash(process.env.password, 10);

      const user = await User.create({
        role: process.env.role,
        name: process.env.name,
        email: process.env.email,
        phone: process.env.phone,
        password: hashedPassword,
        isVerified: true,
      });

      console.log("Admin registered successfully");
      console.log(user);
    }
  } catch (error) {
    console.error("Error seeding admin:", error.message);
  }
};

AdminSeeder();
