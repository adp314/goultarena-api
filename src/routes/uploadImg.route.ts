import express from "express";
import uploadS3 from "../config/aws3.config";

const uploadImageRouter = express.Router();

uploadImageRouter.post(
  "/upload",
  uploadS3.array("inputFile", 3),
  (req: any, res: any) => {
    if (!req.file) {
      console.log(req.file);
      return res.status(400).json({ msg: "Upload fail" });
    }

    return res.status(201).json({
      message: "Successfully uploaded " + req.files.length + " files!",
      files: req.files,
    });
  }
);

export { uploadImageRouter };
