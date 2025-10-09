import express from "express";
import {
  employerMiddleware,
  protect,
} from "./../middlewares/authMiddleware.js";
import { upload } from "./../middlewares/multermiddleware.js";
import {
  createprofileemployer,
  editprofileemployer,
  getprofileemployer,
} from "../controllers/employercontroller.js";

const router = express.Router();

router.post(
  "/createemployerprofile",
  protect,
  employerMiddleware,
  upload.single("companylogo"),
  createprofileemployer
);

router.get(
  "/getprofileemployer",
  protect,
  employerMiddleware,
  getprofileemployer
);

router.put(
  "/updateemployer",
  protect,
  employerMiddleware,
  upload.single("companylogo"),
  editprofileemployer
);

export default router;
