import express from "express";
import { upload } from "../middlewares/multermiddleware.js";
import {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
  getAllProfiles,
  getallapplicant,
  getProfileScore,
} from "../controllers/jobseekercontroller.js";
import { jobSeekerMiddleware, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

//  create profile

router.post(
  "/createprofile",
  protect,
  jobSeekerMiddleware,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  createProfile
);

// get  job seeker profile

router.get("/getprofile", protect, jobSeekerMiddleware, getProfile);

// get all job seeker for admin

router.get("/all-profies", getAllProfiles);

// update the profile

router.put(
  "/update/:id",
  protect,
  jobSeekerMiddleware,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  // upload.single("resume"),
  updateProfile
);

// delete the profile
router.delete(
  "/deleteprofile/:id",
  protect,
  jobSeekerMiddleware,
  deleteProfile
);

// get applicant details
router.get("/details", protect, jobSeekerMiddleware, getallapplicant);

router.get(
  "/get-profile-score",
  protect,
  jobSeekerMiddleware,
  getProfileScore
);

export default router;
