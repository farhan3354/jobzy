import Application from "../models/application.js";
import JobSeekerProfile from "../models/jobseeker.js";

export const getApplicantsByJobId = async (req, res) => {
  try {
    const { id: jobId } = req.params;

    const applications = await Application.find({ jobId })
      .populate("applicantId", "name email phone")
      .populate("jobId", "jobTitle");

    if (!applications.length) {
      return res.status(200).json({ success: true, applicants: [] });
    }

    return res.status(200).json({ success: true, applicants: applications });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const applicant = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const application = await Application.findOne({ applicantId: id });
    // .select("-password");
    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const profile = await JobSeekerProfile.findOne({ userId: id }).populate(
      "userId",
      "name email phone"
    );

    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "profile not found" });
    }

    return res.status(200).json({
      success: true,
      application,
      profile,
    });
  } catch (error) {
    console.error("Error fetching user with profile:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
