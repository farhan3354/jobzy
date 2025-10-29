import {
  transporter,
  applicationMailOptions,
} from "./../helper/registeremail.js";

import JobSeekerProfile from "../models/jobseeker.js";
import Application from "../models/application.js";
import Job from "./../models/jobs.js";
import User from "./../models/usermodel.js";


export const apply = async (req, res) => {
  try {
    const userId = req.user.id;
    const jobId = req.params.id;

    const { lastcompany, lastsalary, availability, coverLetter, experience } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const existingApplication = await Application.findOne({
      userId,
      jobId,
    });

    if (existingApplication) {
      return res.status(400).json({ message: "Already applied for this job" });
    }

    let resumeUrl = null;

    if (req.files && req.files.newResume) {
      const resumeFile = req.files.newResume[0];
      resumeUrl = resumeFile.path;

      await JobSeekerProfile.findOneAndUpdate(
        { userId },
        {
          seekerresumeUrl: resumeUrl,
          updatedAt: new Date(),
        },
        { new: true }
      );
    } else {
      const profile = await JobSeekerProfile.findOne({ userId });
      resumeUrl = profile?.seekerresumeUrl;
    }

    const application = new Application({
      jobId,
      applicantId: userId,
      userId: userId,
      lastcompany,
      lastsalary,
      availability,
      coverLetter,
      experience,
      resumeUrl,
      status: "Pending",
      appliedAt: new Date(),
    });

    await application.save();

    await Job.findByIdAndUpdate(jobId, {
      $push: { applicants: application._id },
    });

    // FIXED: Use postedBy instead of userId for population
    const jobWithEmployer = await Job.findById(jobId).populate("postedBy"); 
    const applicant = await User.findById(userId);

    if (jobWithEmployer?.postedBy?.email) {
      const mailOpts = applicationMailOptions(
        jobWithEmployer.jobTitle, // Use jobTitle from your schema
        applicant.name || applicant.username,
        jobWithEmployer.postedBy.email, // Use postedBy.email instead of userId.email
        coverLetter
      );

      await transporter.sendMail(mailOpts);
    }

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      applicationId: application._id,
    });
  } catch (error) {
    console.error("Error applying for job:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


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

//     // ✅ Send email to employer
// const job = await Job.findById(jobId).populate("userId"); // employer info
// const applicant = await User.findById(applicantId);

// if (job?.userId?.email) {
//   const mailOpts = applicationMailOptions(
//     job.title,
//     applicant.name,
//     job.userId.email,
//     coverLetter
//   );

//   await transporter.sendMail(mailOpts);
// }

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
