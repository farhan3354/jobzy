import express from "express";
import {
  deletetestformadte,
  getdataandupdate,
  getdatabyid,
  getformdata,
  postformtest,
} from "../controllers/testcontroller.js";

const router = express.Router();

// router.get("/jobseeker-details/:id", protect, employerMiddleware, applicant);

router.post("/api/test", postformtest);

router.get("/api/get", getformdata);

router.get("/api/get/:id", getdatabyid);

router.put("/api/changedetais/:id", getdataandupdate);

router.delete("/api/del/:id", deletetestformadte);

export default router;
