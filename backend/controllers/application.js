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
    const { jobId } = req.params;

    const { lastcompany, lastsalary, availability, coverLetter, experience } =
      req.body;

    if (!availability || !experience) {
      return res.status(400).json({
        success: false,
        message: "Availability and experience are required fields",
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const existingApplication = await Application.findOne({
      userId,
      jobId,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    let resumeUrl = null;

    const existingProfile = await JobSeekerProfile.findOne({ userId });

    if (req.files && req.files.resume) {
      const resumeFile = req.files.resume[0];
      resumeUrl = resumeFile.path;

      if (!existingProfile) {
        await JobSeekerProfile.findOneAndUpdate(
          { userId },
          {
            seekerresumeUrl: resumeUrl,
            userId: userId,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
          }
        );
      }
    } else {
      if (existingProfile?.seekerresumeUrl) {
        resumeUrl = existingProfile.seekerresumeUrl;
      } else {
        return res.status(400).json({
          success: false,
          message: "Please upload a resume for your first application",
        });
      }
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

    try {
      const jobWithEmployer = await Job.findById(jobId).populate("postedBy");
      const applicant = await User.findById(userId);

      if (jobWithEmployer?.postedBy?.email) {
        const mailOpts = applicationMailOptions(
          jobWithEmployer.jobTitle,
          applicant.name || applicant.username,
          jobWithEmployer.postedBy.email,
          coverLetter
        );

        await transporter.sendMail(mailOpts);
      }
    } catch (emailError) {
      console.error("Email sending error:", emailError);
    }

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      applicationId: application._id,
    });
  } catch (error) {
    console.error("Error applying for job:", error);

    if (error.name === "TimeoutError") {
      return res.status(408).json({
        success: false,
        message: "Request timeout. Please try again.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

// export const apply = async (req, res) => {

//   try {
//     const userId = req.user.id;
//     const jobId = req.params.id;

//     const { lastcompany, lastsalary, availability, coverLetter, experience } =
//       req.body;

//     if (!availability || !experience) {
//       return res.status(400).json({
//         success: false,
//         message: "Availability and experience are required fields",
//       });
//     }

//     const job = await Job.findById(jobId);
//     if (!job) {
//       return res.status(404).json({
//         success: false,
//         message: "Job not found",
//       });
//     }

//     const existingApplication = await Application.findOne({
//       userId,
//       jobId,
//     });

//     if (existingApplication) {
//       return res.status(400).json({
//         success: false,
//         message: "You have already applied for this job",
//       });
//     }

//     let resumeUrl = null;

//     // Check if jobseeker profile exists
//     const existingProfile = await JobSeekerProfile.findOne({ userId });

//     if (req.files && req.files.resume) {
//       const resumeFile = req.files.resume[0];
//       resumeUrl = resumeFile.path;

//       // Only create/update profile if it doesn't exist
//       if (!existingProfile) {
//         await JobSeekerProfile.findOneAndUpdate(
//           { userId },
//           {
//             seekerresumeUrl: resumeUrl,
//             userId: userId,
//             createdAt: new Date(),
//             updatedAt: new Date(),
//           },
//           {
//             new: true,
//             upsert: true, // Create if doesn't exist
//             setDefaultsOnInsert: true,
//           }
//         );
//       }
//       // If profile already exists, don't update the CV - user must update profile separately
//     } else {
//       // If no new file uploaded, use existing profile CV
//       if (existingProfile?.seekerresumeUrl) {
//         resumeUrl = existingProfile.seekerresumeUrl;
//       } else {
//         return res.status(400).json({
//           success: false,
//           message: "Please upload a resume for your first application",
//         });
//       }
//     }

//     const application = new Application({
//       jobId,
//       applicantId: userId,
//       userId: userId,
//       lastcompany,
//       lastsalary,
//       availability,
//       coverLetter,
//       experience,
//       resumeUrl,
//       status: "Pending",
//       appliedAt: new Date(),
//     });

//     await application.save();

//     // Update job with applicant
//     await Job.findByIdAndUpdate(jobId, {
//       $push: { applicants: application._id },
//     });

//     // Send email notification
//     try {
//       const jobWithEmployer = await Job.findById(jobId).populate("postedBy");
//       const applicant = await User.findById(userId);

//       if (jobWithEmployer?.postedBy?.email) {
//         const mailOpts = applicationMailOptions(
//           jobWithEmployer.jobTitle,
//           applicant.name || applicant.username,
//           jobWithEmployer.postedBy.email,
//           coverLetter
//         );

//         await transporter.sendMail(mailOpts);
//       }
//     } catch (emailError) {
//       console.error("Email sending error:", emailError);
//     }

//     return res.status(201).json({
//       success: true,
//       message: "Application submitted successfully",
//       applicationId: application._id,
//     });
//   } catch (error) {
//     console.error("Error applying for job:", error);

//     if (error.name === "TimeoutError") {
//       return res.status(408).json({
//         success: false,
//         message: "Request timeout. Please try again.",
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: "Internal server error. Please try again later.",
//     });
//   }
// };

// export const apply = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const jobId = req.params.id;

//     const { lastcompany, lastsalary, availability, coverLetter, experience } =
//       req.body;

//     if (!availability || !experience) {
//       return res.status(400).json({
//         success: false,
//         message: "Availability and experience are required fields",
//       });
//     }
//     const job = await Job.findById(jobId);
//     if (!job) {
//       return res.status(404).json({
//         success: false,
//         message: "Job not found",
//       });
//     }
//     const existingApplication = await Application.findOne({
//       userId,
//       jobId,
//     });

//     if (existingApplication) {
//       return res.status(400).json({
//         success: false,
//         message: "You have already applied for this job",
//       });
//     }

//     let resumeUrl = null;
//     if (req.files && req.files.resume) {
//       const resumeFile = req.files.resume[0];
//       resumeUrl = resumeFile.path;

//       JobSeekerProfile.findOneAndUpdate(
//         { userId },
//         {
//           seekerresumeUrl: resumeUrl,
//           updatedAt: new Date(),
//         },
//         { new: true }
//       ).catch((err) => console.error("Error updating profile:", err));
//     } else {
//       const profile = await JobSeekerProfile.findOne({ userId });
//       resumeUrl = profile?.seekerresumeUrl;

//       if (!resumeUrl) {
//         return res.status(400).json({
//           success: false,
//           message: "Please upload a resume",
//         });
//       }
//     }
//     const application = new Application({
//       jobId,
//       applicantId: userId,
//       userId: userId,
//       lastcompany,
//       lastsalary,
//       availability,
//       coverLetter,
//       experience,
//       resumeUrl,
//       status: "Pending",
//       appliedAt: new Date(),
//     });

//     await application.save();
//     Job.findByIdAndUpdate(jobId, {
//       $push: { applicants: application._id },
//     }).catch((err) => console.error("Error updating job:", err));

//     try {
//       const jobWithEmployer = await Job.findById(jobId).populate("postedBy");
//       const applicant = await User.findById(userId);

//       if (jobWithEmployer?.postedBy?.email) {
//         const mailOpts = applicationMailOptions(
//           jobWithEmployer.jobTitle,
//           applicant.name || applicant.username,
//           jobWithEmployer.postedBy.email,
//           coverLetter
//         );

//         transporter
//           .sendMail(mailOpts)
//           .catch((err) => console.error("Email sending error:", err));
//       }
//     } catch (emailError) {
//       console.error("Email preparation error:", emailError);
//     }

//     return res.status(201).json({
//       success: true,
//       message: "Application submitted successfully",
//       applicationId: application._id,
//     });
//   } catch (error) {
//     console.error("Error applying for job:", error);

//     if (error.name === "TimeoutError") {
//       return res.status(408).json({
//         success: false,
//         message: "Request timeout. Please try again.",
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: "Internal server error. Please try again later.",
//     });
//   }
// };

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
