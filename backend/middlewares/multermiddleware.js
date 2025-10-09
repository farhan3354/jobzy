import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    if (file.fieldname === "resume") {
      return {
        folder: "pdfs",
        resource_type: "raw",
        format: "pdf",
        public_id: file.originalname.split(".")[0],
      };
    } else if (file.fieldname === "profileImage") {
      return {
        folder: "images",
        resource_type: "image",
        public_id: file.originalname.split(".")[0],
      };
    } else if (file.fieldname === "companylogo") {
      return {
        folder: "images",
        resource_type: "image",
        public_id: file.originalname.split(".")[0],
      };
    } else if (file.fieldname === "blog") {
      return {
        folder: "images",
        resource_type: "image",
        public_id: file.originalname.split(".")[0],
      };
    }
  },
});

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "pdfs",
//     resource_type: "raw",
//     format: async () => "pdf",
//   },
// });

// const imageStorage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => ({
//     folder: "images",
//     resource_type: "image",
//     public_id: file.originalname.split(".")[0],
//   }),
// });

export const upload = multer({ storage });
