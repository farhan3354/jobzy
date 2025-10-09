import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/authroutes.js";
import userApply from "./routes/applicationroutes.js";
import postJob from "./routes/jobPost.js";
import employer from "./routes/employerroutes.js";
import blog from "./routes/blogRoutes.js";
import { v2 as cloudinary } from "cloudinary";
import profile from "./routes/jobseekerroutes.js";
import apllicant from "./routes/getapplicant.js";
import formdata from "./routes/testformroute.js";
import interviewrouter from "./routes/interview.js";
import query from "./routes/conactroutes.js";

dotenv.config();
import cors from "cors";

const app = express();
const port = process.env.PORT || 4000;
app.use(
  cors({
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use("/", userRoutes);

app.use("/", postJob);
app.use("/", userApply);
app.use("/", profile);

app.use("/", apllicant);

app.use("/", formdata);

app.use("/", interviewrouter);
app.use("/", employer);

app.use("/", blog);

app.use("/", query);

connectDB();
app.listen(port, () => {
  console.log("Server started on port", port);
});
