import express from "express";
import {
  applicant,
  getApplicantsByJobId,
} from "./../controllers/getapplicantcontroller.js";
const router = express.Router();
import { employerMiddleware, protect } from "../middlewares/authMiddleware.js";

router.get(
  "/all-applicant/:id",
  protect,
  employerMiddleware,
  getApplicantsByJobId
);

router.get("/jobseeker-details/:id", protect, employerMiddleware, applicant);

export default router;
