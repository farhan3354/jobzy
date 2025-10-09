import ContactModel from "../models/contactModel.js";

export const sendQuery = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const query = await ContactModel.create({
      name,
      email,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Query submitted successfully!",
      query,
    });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error while saving contact form",
    });
  }
};

export const getQuery = async (req, res) => {
  try {
    const messa = await ContactModel.find();
    if (!messa || messa.length === 0) {
      return res
        .status(409)
        .json({ success: false, message: "No data in the  database" });
    }
    return res.status(200).json({ success: true, messa });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteQuery = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "ID parameter is required" });
    }

    const deletedQuery = await ContactModel.findByIdAndDelete(id);

    if (!deletedQuery) {
      return res
        .status(404)
        .json({ success: false, message: "Query not found" });
    }

    return res
      .status(200)
      .json({
        success: true,
        message: "Query deleted successfully",
        data: deletedQuery,
      });
  } catch (error) {
    console.error("Delete query error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
