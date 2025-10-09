import Employer from "../models/employer.js";

export const createprofileemployer = async (req, res) => {
  try {
    const employerId = req.user.id;
    const {
      companyName,
      companyWebsite,
      industry,
      location,
      description,
      companysize,
    } = req.body;

    if (
      !companyName ||
      !companyWebsite ||
      !industry ||
      !location ||
      !description ||
      !companysize
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Company logo is required",
      });
    }

    const profileImageUrl = req.file.path;

    const existingProfile = await Employer.findOne({ userId: employerId });
    if (existingProfile) {
      return res.status(409).json({
        success: false,
        message: "Employer profile already exists",
      });
    }

    const employer = await Employer.create({
      userId: employerId,
      companylogo: profileImageUrl,
      companyName,
      companysize,
      companyWebsite,
      industry,
      location,
      description,
    });

    return res.status(201).json({
      success: true,
      message: "Employer profile created successfully",
      employer,
    });
  } catch (error) {
    console.error("Error creating employer profile:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getprofileemployer = async (req, res) => {
  try {
    const empid = req.user.id;

    if (!empid) {
      return res
        .status(400)
        .json({ success: false, message: "Id is required" });
    }
    const user = await Employer.findOne({ userId: empid }).populate("userId");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User is not found in the database" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const editprofileemployer = async (req, res) => {
  try {
    const id = req.user.id;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Id is required" });
    }
    const findemployer = await Employer.findOne({ userId: id });
    if (!findemployer) {
      return res
        .status(404)
        .json({ success: false, message: "Employer not found" });
    }

    const {
      companyName,
      companyWebsite,
      industry,
      location,
      description,
      companysize,
    } = req.body;

    if (
      !companyName ||
      !companyWebsite ||
      !industry ||
      !location ||
      !description ||
      !companysize
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Company logo is required",
      });
    }

    const profileImageUrl = req.file.path;

    const employerupdate = await Employer.findByIdAndUpdate(
      findemployer._id,
      {
        userId: id,
        companylogo: profileImageUrl,
        companyName,
        companysize,
        companyWebsite,
        industry,
        location,
        description,
      },
      { new: true }
    );
    return res.status(201).json({ success: true, employerupdate });
  } catch (error) {
    console.log("Server Error");
  }
};
