import express from "express";
import {
  deleteQuery,
  getQuery,
  sendQuery,
} from "../controllers/contactController.js";

const router = express.Router();

router.post("/contact", sendQuery);

router.post("/contactget", getQuery);

router.delete("/contact/:id", deleteQuery);

export default router;
