import testmessage from "../models/test.js";

export const postformtest = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      return res
        .status(400)
        .json({ success: false, message: "All the fields are required" });
    }
    const findata = await testmessage.findOne({ email });
    if (findata) {
      return res.status(400).json({
        success: false,
        message: "data all ready exist in the data base",
      });
    }
    const data = await testmessage.create({
      name,
      email,
      phone,
      message,
    });

    return res
      .status(201)
      .json({ success: true, message: "form submitted successfully", data });
  } catch (error) {
    console.log(error);
  }
};

export const getformdata = async (req, res) => {
  try {
    const dataform = await testmessage.find();
    if (!dataform) {
      return res
        .status(404)
        .json({ success: true, message: "No data found in the database " });
    }

    return res
      .status(200)
      .json({ success: true, message: "data found successfully", dataform });
  } catch (error) {
    console.log(error);
  }
};

export const getdatabyid = async (req, res) => {
  try {
    const { id } = req.params;
    const dat = await testmessage.findById(id);
    if (!dat) {
      return res
        .status(404)
        .json({ success: false, message: "data is present in the database" });
    }
    return res
      .status(200)
      .json({ success: true, message: "data is found by the form id", dat });
  } catch (error) {
    console.log(error);
  }
};

export const getdataandupdate = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(404)
        .json({ success: false, message: "Id is required" });
    }
    const { name, email, phone, message } = req.body;

    const data = await testmessage.findByIdAndUpdate(
      id,
      {
        name,
        email,
        phone,
        message,
      },
      { new: true }
    );
    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "data is not found in the database" });
    }
    return res
      .status(200)
      .json({ success: true, message: "data found successfully", data });
  } catch (error) {
    console.log(error);
  }
};

export const deletetestformadte = async (req, res) => {
  const { id } = req.params;

  const data = await testmessage.findById(id);
  if (!data) {
    return res
      .status(404)
      .json({ success: false, message: "data is not found" });
  }
  const del = await testmessage.findByIdAndDelete(id);
  return res
    .status(200)
    .json({ success: true, message: "Data delete successfully" });
};
