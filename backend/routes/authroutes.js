import express from "express";
import {
  registeruser,
  loginuser,
  getUsers,
  getemployer,
  createrofile,
  getProfile,
  editadminprofile,
  ChangePassword,
  verifyOtp,
  getdetails,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import {
  adminMiddleware,
  employerMiddleware,
  protect,
} from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multermiddleware.js";

const router = express.Router();

router.post("/register", registeruser);

router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", verifyOtp);

router.post("/login", loginuser);

router.get("/", (req, res) => {
  res.send("Hello from the server");
});

router.get("/verify", protect, (req, res) => {
  res.json({ message: "Token valid", user: req.user });
});

router.get("/getuser", protect, adminMiddleware, getUsers);

router.get("/getemployer", protect, adminMiddleware, getemployer);

// Create profile
router.post(
  "/adminProfile",
  protect,
  adminMiddleware,
  upload.single("profileImage"),
  createrofile
);

// Get profile by userId
router.get("/admin", protect, getProfile);

router.patch(
  "/edit",
  protect,
  adminMiddleware,
  upload.single("profileImage"),
  editadminprofile
);

router.patch("/changepassword", protect, ChangePassword);

router.get("/alldetails", protect, adminMiddleware, getdetails);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
export default router;
