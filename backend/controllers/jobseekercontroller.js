import Application from "../models/application.js";
import Job from "../models/jobs.js";
import JobSeekerProfile from "../models/jobseeker.js";

// create profile
export const createProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      headline,
      about,
      location,
      seekerjobstitle,
      seekerjobscompany,
      seekerjobdescripition,
      seekerexperience,
      seekerdegree,
      seekerinsitute,
      seekereducation,
    } = req.body;

    let seekerskills = [];

    if (req.body.seekerskills) {
      try {
        seekerskills = JSON.parse(req.body.seekerskills);
      } catch (err) {
        return res
          .status(400)
          .json({ message: "Invalid JSON format for seekerskills" });
      }
    }

    if (!headline || !about || !location) {
      return res.status(400).json({
        message: "Headline, about, and location are required",
      });
    }

    console.log("Uploaded Files:", req.files);

    const profileImageUrl = req.files?.profileImage?.[0]?.path || null;
    const resumeUrl = req.files?.resume?.[0]?.path || null;

    const newProfile = new JobSeekerProfile({
      userId,
      profileImage: profileImageUrl,
      headline,
      about,
      location,
      seekerjobstitle,
      seekerjobscompany,
      seekerjobdescripition,
      seekerexperience,
      seekerdegree,
      seekerinsitute,
      seekereducation,
      seekerskills,
      seekerresumeUrl: resumeUrl,
    });

    await newProfile.save();

    return res.status(201).json({ success: true, profile: newProfile });
  } catch (error) {
    console.error("Error creating profile:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// get all profile

export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await JobSeekerProfile.find().populate(
      "userId",
      "name email"
    );
    if (!profiles || profiles.length === 0) {
      return res.status(404).json({ message: "No profile are exist" });
    }

    return res.status(200).json({ success: true, profiles });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await JobSeekerProfile.findOne({
      userId: userId,
    }).populate("userId");

    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    return res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// update profile jobseeker

export const updateProfile = async (req, res) => {
  try {
    const profileId = req.params.id;

    const existingProfile = await JobSeekerProfile.findById(profileId);
    if (!existingProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    const {
      headline,
      about,
      location,
      seekerjobstitle,
      seekerjobscompany,
      seekerjobdescripition,
      seekerexperience,
      seekerdegree,
      seekerinsitute,
      seekereducation,
    } = req.body;

    const seekerskills = req.body.seekerskills
      ? JSON.parse(req.body.seekerskills)
      : [];

    if (!headline || !about || !location) {
      return res
        .status(400)
        .json({ message: "Headline, about, and location are required" });
    }

    // const resumeUrl = req.file?.path || existingProfile.seekerresumeUrl;
    const profileImageUrl = req.files?.profileImage?.[0]?.path || null;
    const resumeUrl = req.files?.resume?.[0]?.path || null;

    const updatedProfile = await JobSeekerProfile.findByIdAndUpdate(
      profileId,
      {
        profileImage: profileImageUrl,
        headline,
        about,
        location,
        seekerjobstitle,
        seekerjobscompany,
        seekerjobdescripition,
        seekerexperience,
        seekerdegree,
        seekerinsitute,
        seekereducation,
        seekerskills: seekerskills,
        seekerresumeUrl: resumeUrl,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const profile = await JobSeekerProfile.findByIdAndDelete(req.params.id);

    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Profile deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//  see the applied jobs

export const getallapplicant = async (req, res) => {
  try {
    const applicantId = req.user?.id;

    if (!applicantId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID missing" });
    }

    const applications = await Application.find({ applicantId }).populate(
      "jobId"
    );

    if (!applications || applications.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No applications found for this applicant",
      });
    }

    return res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error("Error fetching applicant jobs:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching applied jobs",
    });
  }
};

//  get profile schoree
export const getProfileScore = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await JobSeekerProfile.findOne({ userId }).populate("userId");

    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    let score = 0;
    let missingFields = [];

    if (profile.userId.name) score += 10;
    else missingFields.push("Name");

    if (profile.userId.email) score += 10;
    else missingFields.push("Email");

    if (profile.headline) score += 10;
    else missingFields.push("Headline");

    if (profile.about) score += 10;
    else missingFields.push("About");

    if (profile.location) score += 10;
    else missingFields.push("Location");

    if (profile.seekerjobstitle) score += 10;
    else missingFields.push("Job Title");

    if (profile.seekerskills && profile.seekerskills.length > 0) score += 10;
    else missingFields.push("Skills");

    if (profile.seekerresumeUrl) score += 30;
    else missingFields.push("Resume");

    return res.status(200).json({
      success: true,
      profile,
      profileCompletion: score,
      missingFields,
    });
  } catch (error) {
    console.error("Error fetching profile score:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
// export const createProfile = async (req, res) => {
//   try {
//     const userId = req.user.id;

// const {
//   headline,
//   about,
//   location,
//   seekerjobstitle,
//   seekerjobscompany,
//   seekerjobdescripition,
//   seekerexperience,
//   seekerdegree,
//   seekerinsitute,
//   seekereducation,
// } = req.body;

//     const seekerskills = req.body.seekerskills
//       ? JSON.parse(req.body.seekerskills)
//       : [];

//     if (!headline || !about || !location) {
//       return res
//         .status(400)
//         .json({ message: "Headline, about, and location are required" });
//     }

//     console.log("Uploaded File:", req.file);

//     const cvurl = req.file?.path || null;

//     const newProfile = new JobSeekerProfile({
//       userId,
//       profileImage: req.body.profileImage || undefined,
//       headline,
//       about,
//       location,
//       seekerjobstitle,
//       seekerjobscompany,
//       seekerjobdescripition,
//       seekerexperience,
//       seekerdegree,
//       seekerinsitute,
//       seekereducation,
//       seekerskills,
//       seekerresumeUrl: cvurl,
//     });

//     await newProfile.save();

//     return res.status(201).json({ success: true, profile: newProfile });
//   } catch (error) {
//     console.error("Error creating profile:", error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };
