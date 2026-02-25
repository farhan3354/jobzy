import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    jobTitle: { type: String, required: true },
    companyName: { type: String, required: true },
    jobDescription: { type: String, required: true },
    requirements: { type: [String], default: [], required: true },
    employmentType: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    location: { type: String, required: true },
    salary: { type: String, required: true },
    skills: { type: [String], default: [], required: true },
    applicationDeadline: { type: Date, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String },
    experienceLevel: { type: String, required: true },
    numberOfOpenings: { type: Number, default: 1, required: true },
    hiringTimeline: { type: String },
    schedule: { type: [String], default: [] },
    benefits: { type: [String], default: [] },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Closed"],
      default: "Active",
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
