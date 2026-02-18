import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";
import bcrypt from "bcrypt";
import {
  mailOptions,
  transporter,
  resetPasswordMailOptions,
} from "../helper/registeremail.js";
import JobSeekerProfile from "../models/jobseeker.js";
import Employer from "../models/employer.js";
import AdminProfile from "../models/admin.js";
import Job from "./../models/jobs.js";

// export const registeruser = async (req, res) => {
//   try {
//     const { role, name, email, phone, password } = req.body;

//     if (!role || !name || !email || !phone || !password) {
//       return res.status(400).json({ message: "All the fields are required" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       role,
//       name,
//       email,
//       phone,
//       password: hashedPassword,
//     });
//     await transporter.sendMail(mailOptions(email, name));

//     return res.status(201).json({
//       message:
//         "Registration email sent successfully . User registered successfully",
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const registeruser = async (req, res) => {
  try {
    const { role, name, email, phone, password } = req.body;

    if (!role || !name || !email || !phone || !password) {
      return res.status(400).json({ message: "All the fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (!existingUser.isVerified && existingUser.otpExpires < Date.now()) {
        await User.deleteOne({ email });
      } else {
        return res.status(409).json({ message: "User already exists" });
      }
    }
    // if (existingUser) {
    //   return res.status(409).json({ message: "User already exists" });
    // }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 5 * 60 * 1000;

    const user = await User.create({
      role,
      name,
      email,
      phone,
      password: hashedPassword,
      otp,
      otpExpires,
    });

    await transporter.sendMail(mailOptions(name, email, otp));

    return res.status(201).json({
      message: "OTP sent to your email. Please verify your account.",
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Account verified successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Fill all the details" });
    }

    const checkuser = await User.findOne({ email });
    if (!checkuser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    if (!checkuser.isVerified) {
      return res
        .status(403)
        .json({ message: "Please verify your account before login" });
    }

    const matchpassword = await bcrypt.compare(password, checkuser.password);
    if (!matchpassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: checkuser._id, role: checkuser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: checkuser._id,
        role: checkuser.role,
        name: checkuser.name,
        email: checkuser.email,
        phone: checkuser.phone,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// export const loginuser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "Fill all the details" });
//     }

//     const checkuser = await User.findOne({ email });
//     if (!checkuser) {
//       return res.status(400).json({ message: "User does not exist" });
//     }

//     const matchpassword = await bcrypt.compare(password, checkuser.password);
//     if (!matchpassword) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       { id: checkuser._id, role: checkuser.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.status(200).json({
//       message: "Login successful",
//       token,
//       user: {
//         id: checkuser._id,
//         role: checkuser.role,
//         name: checkuser.name,
//         email: checkuser.email,
//         phone: checkuser.phone,
//       },
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

export const getUsers = async (req, res) => {
  try {
    const profile = await JobSeekerProfile.find().populate("userId");
    // const users = await User.find({role: "job-seeker"});

    if (profile.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No jobseekers found" });
    }

    return res.status(200).json({ success: true, profile });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

export const getemployer = async (req, res) => {
  try {
    const employer = await Employer.find().populate("userId");
    if (employer.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No jobseekers found" });
    }

    return res.status(200).json({ success: true, employer });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Create
export const createrofile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bio, location } = req.body;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: User ID missing" });
    }

    if (!bio || !location) {
      return res.status(400).json({
        success: false,
        message: "Both bio and location are required",
      });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Profile image is required" });
    }

    const profileImageUrl = req.file.path;

    const existingProfile = await AdminProfile.findOne({ userId });
    if (existingProfile) {
      return res
        .status(409)
        .json({ success: false, message: "Profile already exists" });
    }

    const profile = await AdminProfile.create({
      userId,
      bio,
      location,
      profileImage: profileImageUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: profile,
    });
  } catch (error) {
    console.error("Error creating profile:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get Profile
export const getProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const profile = await AdminProfile.findOne({
      userId: id,
    }).populate("userId", "name email role phone");
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    return res.status(200).json({ profile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// change profile

export const editadminprofile = async (req, res) => {
  try {
    const id = req.user.id;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const { name, email, phone, bio, location } = req.body;

    const userUpdate = {};
    if (name) userUpdate.name = name;
    if (email) userUpdate.email = email;
    if (phone) userUpdate.phone = phone;

    const adminUpdate = {};
    if (bio) adminUpdate.bio = bio;
    if (location) adminUpdate.location = location;
    if (req.file) adminUpdate.profileImage = req.file.path;

    const updatedUser = await User.findByIdAndUpdate(id, userUpdate, {
      new: true,
    });

    const updatedAdminProfile = await AdminProfile.findOneAndUpdate(
      { userId: id },
      adminUpdate,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
      adminProfile: updatedAdminProfile,
    });
  } catch (error) {
    console.error("Error updating admin profile:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

// change password

export const ChangePassword = async (req, res) => {
  try {
    const id = req.user.id;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const { oldpassword, newpassword } = req.body;

    if (!oldpassword || !newpassword) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const profile = await User.findById(id);

    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    const isMatch = await bcrypt.compare(oldpassword, profile.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Old password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newpassword, 10);
    profile.password = hashedPassword;
    await profile.save();

    return res
      .status(200)
      .json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// get all the details for the dashboard

export const getdetails = async (req, res) => {
  try {
    const users = await JobSeekerProfile.find().populate("userId");
    const employer = await Employer.find().populate("userId");
    const jobs = await Job.find().populate("postedBy");

    if (users.length === 0 && employer.length === 0 && jobs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No data found in the database",
      });
    }

    return res.status(200).json({
      success: true,
      users,
      employer,
      jobs,
    });
  } catch (error) {
    console.error("Error fetching details:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    user.resetPasswordOTP = otp;
    user.resetPasswordOTPExpires = otpExpires;
    await user.save();

    await transporter.sendMail(resetPasswordMailOptions(user.name, email, otp));

    res.status(200).json({ message: "Reset OTP sent to your email" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newpassword } = req.body;

    if (!email || !otp || !newpassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (
      user.resetPasswordOTP !== otp ||
      user.resetPasswordOTPExpires < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(newpassword, 10);
    user.password = hashedPassword;
    user.resetPasswordOTP = undefined;
    user.resetPasswordOTPExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
