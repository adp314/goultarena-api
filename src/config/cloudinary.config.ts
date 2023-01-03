import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import * as dotenv from "dotenv";

dotenv.config();

const cloudinaryInst = cloudinary.v2;

cloudinaryInst.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinaryInst,
  params: {
    folder: "thready_profile_pictures",
    format: async (req: any, file: any) => "png",
    use_filename: true,
    public_id: (req: any, file: any) => {
      console.log(
        new Date().toISOString().replace(/:/g, "-") + file.originalname
      );
      return new Date().toISOString().replace(/:/g, "-") + file.originalname;
    },
  },
});

const uploadImgMulter = multer({ storage: cloudStorage });

export { uploadImgMulter };
