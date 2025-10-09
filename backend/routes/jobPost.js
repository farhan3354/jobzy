import express from "express";
import {
  protect,
  employerMiddleware,
  adminMiddleware,
  jobSeekerMiddleware,
} from "../middlewares/authMiddleware.js";
import {
  createJob,
  getalljobs,
  getjobsbyid,
  deletejob,
  editjob,
  getidjob,
  getalljob,
  changestatusjob,
  dashboardjob,
  dashboardjobseeker,
} from "../controllers/postJob.js";

const router = express.Router();

router.get("/apply", (req, res) => {
  res.send("Hello from apply");
});
//  create new job
router.post("/post-job", protect, employerMiddleware, createJob);

//  fetch all jobs for the jobseeker
router.get("/get-alljobs", getalljobs);

//  fetch all jobs for the admin
router.get("/getalljobs", protect, adminMiddleware, getalljob);

// get the specific employers jobs
router.get("/get-jobs", protect, employerMiddleware, getjobsbyid);

// get the jobs by there id
router.get("/get-job/:id", protect, employerMiddleware, getidjob);

// remove the jobs by there id
router.delete("/remove/:id", protect, employerMiddleware, deletejob);

//  update the jobs
router.put("/edit-job/:id", protect, employerMiddleware, editjob);

router.put("/update-job-status/:id", protect, changestatusjob);

router.get("/employerjob", protect, employerMiddleware, dashboardjob);

router.get(
  "/getjobsdashboard",
  protect,
  jobSeekerMiddleware,
  dashboardjobseeker
);

export default router;
