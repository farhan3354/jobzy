import express from "express";
import { apply } from "./../controllers/application.js";
const router = express.Router();
// import upload from "./../middlewares/multermiddleware.js";
import { jobSeekerMiddleware, protect } from "../middlewares/authMiddleware.js";

router.post("/apply/:id", protect, jobSeekerMiddleware, apply);

export default router;
