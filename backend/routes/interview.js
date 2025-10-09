import express from "express";
import {
  Editinterview,
  getinterviewform,
  getinterviewid,
  jobseekerinterview,
  postInterviewForm,
} from "../controllers/interviewcontroller.js";
import {
  employerMiddleware,
  jobSeekerMiddleware,
  protect,
} from "../middlewares/authMiddleware.js";

const router = express.Router();
// interview form
router.post("/interview/:id", protect, employerMiddleware, postInterviewForm);
// specific employer jobs
router.get("/getinterview", protect, employerMiddleware, getinterviewform);
// specific jobseeker details
router.get("/getjobseeker", protect, jobSeekerMiddleware, jobseekerinterview);
// edit interview
router.get('/getinterview/:id',protect,employerMiddleware,getinterviewid)
router.put("/editinterview/:id", protect, employerMiddleware, Editinterview);

export default router;
