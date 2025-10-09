import mongoose from "mongoose";

const testmessageform = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
});

const testmessage = new mongoose.model("testmessageform", testmessageform);

export default testmessage;
