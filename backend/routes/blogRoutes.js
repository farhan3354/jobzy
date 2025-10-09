import express from "express";
import {
  createblog,
  editblog,
  getblog,
  getblogbyid,
} from "../controllers/blogController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multermiddleware.js";

const router = express.Router();

router.post("/blogs/create", upload.single("blog"), createblog);

router.get("/api/blog", getblog);

router.get("/api/blog/:id", getblogbyid);

router.put("/api/update/:id", protect, upload.single("blog"), editblog);

export default router;
