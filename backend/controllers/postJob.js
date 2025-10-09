import Job from "../models/jobs.js";
import Application from "./../models/application.js";

//  create job

export const createJob = async (req, res) => {
  try {
    const {
      jobTitle,
      companyName,
      jobDescription,
      requirements,
      employmentType,
      industry,
      location,
      salary,
      skills,
      applicationDeadline,
      contactEmail,
      contactPhone,
    } = req.body;

    if (
      !jobTitle ||
      !companyName ||
      !jobDescription ||
      !requirements ||
      !employmentType ||
      !industry ||
      !location ||
      !salary ||
      !skills ||
      !applicationDeadline ||
      !contactEmail
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    const job = await Job.create({
      jobTitle,
      companyName,
      jobDescription,
      requirements,
      employmentType,
      industry,
      location,
      salary,
      skills,
      applicationDeadline,
      contactEmail,
      contactPhone,
      status: "Active",
      postedBy: req.user.id,
    });

    return res
      .status(201)
      .json({ success: true, message: "Job posted successfully", job });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Faild to add job " });
  }
};

// all jobs for the job-seeker

export const getalljobs = async (req, res) => {
  try {
    const jobs = await Job.find();

    if (!jobs || jobs.length === 0) {
      return res.status(400).json({ message: "No jobs in the database" });
    }

    return res.status(200).json({ message: "Jobs fetched successfully", jobs });
  } catch (error) {
    return res.status(500).json({ message: "Failed to get jobs" });
  }
};

// jobs for the admin dashboard

export const getalljob = async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy");

    if (!jobs || jobs.length === 0) {
      return res.status(400).json({ message: "No jobs in the database" });
    }

    return res.status(200).json({ message: "Jobs fetched successfully", jobs });
  } catch (error) {
    return res.status(500).json({ message: "Failed to get jobs" });
  }
};

// all the employer specific job

export const getjobsbyid = async (req, res) => {
  try {
    const employerjob = await Job.find({
      postedBy: req.user.id,
    });

    if (!employerjob || employerjob.length === 0) {
      return res
        .status(404)
        .json({ message: "No job posted by this employer" });
    }

    return res.status(200).json({
      success: true,
      success: "Job find succesfully",
      jobs: employerjob,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

export const getidjob = async (req, res) => {
  try {
    const { id } = req.params;
    const findjob = await Job.findById(id);

    if (!findjob) {
      return res.status(404).json({ message: "Job not found" });
    }
    return res.status(200).json({ job: findjob });
  } catch (error) {
    return res.status(500).json({ message: "Server Error in the banckend" });
  }
};

// one job for the employer dashboard

export const dashboardjob = async (req, res) => {
  try {
    const userid = req.user.id;
    const job = await Job.findOne({ postedBy: userid }).sort({ createdAt: -1 });
    const applicant = await Application.find();
    if (!job) {
      return res
        .status(404)
        .json({ success: false, message: "No job is posted by this employer" });
    }
    return res.status(200).json({ success: true, job, applicant });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

//  delete specgic job by the owner of the job

export const deletejob = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteemployerjob = await Job.findByIdAndDelete(id);

    if (!deleteemployerjob) {
      return res.status(404).json({ message: "Job not found" });
    }
    return res
      .status(200)
      .json({ success: true, success: "Job deleted successfully" });
  } catch (error) {
    return res.status(500).json("Failed to delete job");
  }
};

//  editjobs by the specific employer

export const editjob = async (req, res) => {
  try {
    const { id } = req.params;

    const existingJob = await Job.findById(id);
    if (!existingJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (existingJob.postedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to edit this job",
      });
    }

    const {
      jobTitle,
      companyName,
      jobDescription,
      requirements,
      employmentType,
      industry,
      location,
      salary,
      skills,
      applicationDeadline,
      contactEmail,
      contactPhone,
      status,
    } = req.body;

    const editemployerjob = await Job.findByIdAndUpdate(
      id,
      {
        jobTitle,
        companyName,
        jobDescription,
        requirements: requirements || [],
        employmentType,
        industry,
        location,
        salary,
        skills,
        applicationDeadline,
        contactEmail,
        contactPhone,
        status,
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: editemployerjob,
    });
  } catch (error) {
    console.error("Edit job error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to edit the job",
      error: error.message,
    });
  }
};

// change status of the jobs

export const changestatusjob = async (req, res) => {
  try {
    const { id } = req.params;
    const findjob = await Job.findById(id);
    const { status } = req.body;
    if (!findjob) {
      return res.status(404).json({ message: "Job not found" });
    }

    findjob.status = status;
    await findjob.save();

    return res
      .status(200)
      .json({ success: true, message: "Status changed successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// jobs on the jobseeker dsahboard

export const dashboardjobseeker = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 }).limit(3);

    if (jobs.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No jobs in the database" });
    }

    return res.status(200).json({ success: true, jobs });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
