import express from "express";
import { apply } from "./../controllers/application.js";
const router = express.Router();
// import upload from "./../middlewares/multermiddleware.js";
import { jobSeekerMiddleware, protect } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multermiddleware.js";

router.post(
  "/apply/:id",
  protect,
  jobSeekerMiddleware,
  upload.fields([{ name: "resume", maxCount: 1 }]),
  apply
);

export default router;
