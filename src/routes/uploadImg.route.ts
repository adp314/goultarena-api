import express from "express";
import { uploadImgMulter } from "../config/cloudinary.config";

const uploadImageRouter = express.Router();

uploadImageRouter.post(
  "/",
  uploadImgMulter.single("picture"),
  (req: any, res: any) => {
    if (!req.file) {
      console.log(req.file);
      return res.status(400).json({ msg: "Upload fail" });
    }

    return res.status(201).json({ url: req.file.path });
  }
);

export { uploadImageRouter };