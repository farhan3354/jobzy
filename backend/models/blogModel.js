import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    category: {
      type: String,
      enum: ["career-tips", "tech", "remote-work", "personal-growth"],
      required: true,
    },
    image: { type: String },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
