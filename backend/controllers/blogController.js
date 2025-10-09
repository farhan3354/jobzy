import Blog from "../models/blogModel.js";

export const createblog = async (req, res) => {
  try {
    const { title, content, author, category } = req.body;
    if (!title || !content || !author || !category) {
      return res
        .status(400)
        .json({ success: false, message: "All the feilds are required" });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "blog log is required",
      });
    }

    const profileImageUrl = req.file.path;

    const blog = await Blog.create({
      title,
      content,
      author,
      category,
      image: profileImageUrl,
    });
    return res.status(201).json({ success: true, blog });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getblog = async (req, res) => {
  try {
    const blog = await Blog.find();

    if (!blog || blog.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No data in database" });
    }

    return res.status(200).json({ success: true, blog });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getblogbyid = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Id is required" });
    }
    const blog = await Blog.findById(id);

    if (!blog) {
      return res
        .status(400)
        .json({ success: false, message: "blog not found " });
    }
    return res.status(200).json({ success: true, blog });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const editblog = async (req, res) => {
  try {
    const { id } = req.params;

    let blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const { title, content, author, category } = req.body;
    if (!title || !content || !author || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let imageUrl = blog.image;

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "blogs",
      });
      imageUrl = uploadResult.secure_url;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        content,
        author,
        category,
        image: imageUrl,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error("❌ Blog update error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
