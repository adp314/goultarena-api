import express from "express";
import aws from "aws-sdk";
import { nanoid } from "nanoid";
import { auth } from "express-oauth2-jwt-bearer";

const s3 = new aws.S3({
  accessKeyId: "AKIA2AHL7B3JVMFAN55L",
  secretAccessKey: "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",
  region: "eu-west-3",
});

const uploadImageRouter = express.Router();

const checkJwt = auth({
  audience: "goutarena-auth0-api",
  issuerBaseURL: `https://goultarena.eu.auth0.com/`,
});

uploadImageRouter.get("/postimg", async (req: any, res: any) => {
  
  if (req.query.sKey) {
    s3.deleteObject(
      {
        Bucket: "goultarena-aws3",
        Key: req.query.sKey,
      },
      (err) => {
        console.log(err);
      }
    );
  }
  function CreateImgKey() {
    const key = nanoid();
    try {
      const post = s3.createPresignedPost({
        Bucket: "goultarena-aws3",
        Fields: {
          key: key,
        },
        Expires: 60, // seconds
        Conditions: [
          ["content-length-range", 0, 5048576 * 2], // up to 2 MB
        ],
      });
      res.send({ key, post });
    } catch (err) {
      console.log(err);
    }
  }
  CreateImgKey();
});

export { uploadImageRouter };
