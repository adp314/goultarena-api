import express from "express";
import aws from "aws-sdk";
import { nanoid } from "nanoid";
import { auth } from "express-oauth2-jwt-bearer";

const s3 = new aws.S3({
  accessKeyId: "AKIA2AHL7B3JVQJCUNJ3",
  secretAccessKey: "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",
  region: "eu-west-3",
});

const uploadImageRouter = express.Router();

const checkJwt = auth({
  audience: "goutarena-auth0-api",
  issuerBaseURL: `https://goultarena.eu.auth0.com/`,
});

uploadImageRouter.get("/postimg", async (req: any, res: any) => {
  const key = nanoid();

  let param = req.query.key;

  if (param) {
    // jsplus cmt on recup les query params avc express xd
    s3.deleteObject(
      {
        Bucket: "goultarena-s3bucket",
        Key: param,
      },
      (err) => {
        console.log(err);
      }
    );
  }

  try {
    const post = await s3.createPresignedPost({
      Bucket: "goultarena-s3bucket",
      Fields: {
        key: key,
      },
      Expires: 60, // seconds
      Conditions: [
        ["content-length-range", 0, 5048576 * 2], // up to 2 MB
      ],
    });
    res.send({ key, post });
    console.log(key, post);
  } catch (err) {
    console.log(err);
  }
});

export { uploadImageRouter };
