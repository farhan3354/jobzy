// models/adminProfileModel.js
import mongoose from "mongoose";

const adminProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    bio: { type: String ,required:true},
    profileImage: {
      type: String,
      default: "https://via.placeholder.com/150",
    },
    location: { type: String },
  },
  { timestamps: true }
);

const AdminProfile = mongoose.model("AdminProfile", adminProfileSchema);
export default AdminProfile;
