import {
  transporter,
  applicationMailOptions,
} from "./../helper/registeremail.js";

import JobSeekerProfile from "../models/jobseeker.js";
import Application from "../models/application.js";
import Job from "./../models/jobs.js";

export const apply = async (req, res) => {
  try {
    const { id: jobId } = req.params;
    const applicantId = req.user?.id;

    const { lastcompany, lastsalary, availability, coverLetter, experience } =
      req.body;

    if (!availability || !experience) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!applicantId) {
      return res.status(404).json({ message: "Applicant ID is required" });
    }

    const profile = await JobSeekerProfile.findOne({ userId: applicantId });
    if (!profile || !profile.seekerresumeUrl) {
      return res.status(400).json({
        message:
          "Please complete your profile and upload your CV before applying.",
      });
    }

    const alreadyApplied = await Application.findOne({ jobId, applicantId });
    if (alreadyApplied) {
      return res.status(409).json({
        message: "You have already applied for this job.",
      });
    }

    const newApplication = await Application.create({
      jobId,
      applicantId,
      lastcompany,
      lastsalary,
      availability,
      coverLetter,
      experience,
      status: "Pending",
    });

    await Job.findByIdAndUpdate(jobId, {
      $push: { applicants: newApplication._id },
    });

    // ✅ Send email to employer
    const job = await Job.findById(jobId).populate("userId"); // employer info
    const applicant = await User.findById(applicantId);

    if (job?.userId?.email) {
      const mailOpts = applicationMailOptions(
        job.title,
        applicant.name,
        job.userId.email,
        coverLetter
      );

      await transporter.sendMail(mailOpts);
    }

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      applicationId: newApplication._id,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Cannot apply",
      error: error.message,
    });
  }
};

// import JobSeekerProfile from "../models/jobseeker.js";
// import Application from "../models/application.js";
// import Job from "./../models/jobs.js";

// export const apply = async (req, res) => {

//   try {
//     const { id: jobId } = req.params;

//     const applicantId = req.user?.id;

//     const { lastcompany, lastsalary, availability, coverLetter, experience } =
//       req.body;

//     if (!availability || !experience) {

//       return res.status(400).json({ message: "All fields are required" });
//     }

//     if (!applicantId) {

//       return res.status(404).json({ message: "Applicant ID is required" });
//     }

//     const profile = await JobSeekerProfile.findOne({ userId: applicantId });

//     if (!profile || !profile.seekerresumeUrl) {

//       return res.status(400).json({
//         message:
//           "Please complete your profile and upload your CV before applying.",
//       });
//     }

//     const alreadyApplied = await Application.findOne({ jobId, applicantId });

//     if (alreadyApplied) {
//       return res.status(409).json({

//         message: "You have already applied for this job.",
//       });
//     }

//     const newApplication = await Application.create({
//       jobId,
//       applicantId,
//       lastcompany,
//       lastsalary,
//       availability,
//       coverLetter,
//       experience,
//       status: "Pending",
//     });

//     await Job.findByIdAndUpdate(jobId, {
//       $push: { applicants: newApplication._id },
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Application submitted successfully",
//       applicationId: newApplication._id,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Cannot apply",
//       error: error.message,
//     });
//   }
// };

// import Application from "../models/application.js";
// import Job from "../models/jobs.js";

// export const apply = async (req, res) => {
//   try {
//     const { id: jobId } = req.params;
//     const applicantId = req.user?.id;
//     const { lastcompany, lastsalary, availability, coverLetter } = req.body;

//     if (!availability || !req.file) {
//       return res
//         .status(400)
//         .json({ message: "Availability and resume are required" });
//     }

//     if (!applicantId) {
//       return res.status(404).json({ message: "Applicant ID is required" });
//     }

//     const resume = req.file.path || req.file.secure_url;

//     const alreadyApplied = await Application.findOne({
//       jobId,
//       applicantId,
//     });

//     if (alreadyApplied) {
//       return res.status(409).json({
//         message: "You have already applied for this job.",
//       });
//     }

//     const newApplication = await Application.create({
//       jobId,
//       applicantId,
//       lastcompany,
//       lastsalary,
//       availability,
//       resume,
//       coverLetter,
//       status: "Pending",
//     });

//     await Job.findByIdAndUpdate(jobId, {
//       $push: { applicants: newApplication._id },
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Application submitted successfully",
//       applicationId: newApplication._id,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Cannot apply",
//       error: error.message,
//     });
//   }
// };

// export const findapplyedjob = async (req, res) => {
//   const applicantId = req.user?.id;
//   if (!applicantId) {
//     return res.status(404).json({ message: "Applicent Id is required" });
//   }
//   const applied = await Application.findOne({ applicantId });
//   return res.status(200).json({ success: true, applied });
// };
