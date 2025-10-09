import mongoose from "mongoose";

const jobSeekerProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    profileImage: {
      type: String,
      default: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    headline: { type: String, required: true },
    about: { type: String, required: true },
    location: { type: String, required: true },
    seekerjobstitle: { type: String, required: true },
    seekerjobscompany: { type: String, required: true },
    seekerjobdescripition: { type: String, required: true },
    seekerexperience: { type: String, required: true },
    seekerdegree: { type: String, required: true },
    seekerinsitute: { type: String, required: true },
    seekereducation: { type: String, required: true },
    seekerskills: { type: [String], default: [], required: true },

    seekerresumeUrl: { type: String },
  },
  { timestamps: true }
);

const JobSeekerProfile = mongoose.model(
  "JobSeekerProfile",
  jobSeekerProfileSchema
);
export default JobSeekerProfile;
