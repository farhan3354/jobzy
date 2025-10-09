import mongoose from "mongoose";

const employerProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companylogo: { type: String },
    companyName: { type: String, required: true },
    companysize: { type: String, required: true },
    companyWebsite: { type: String, required: true },
    industry: { type: String },
    location: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Employer = mongoose.model("EmployerProfile", employerProfileSchema);

export default Employer;
