const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_ACCESS_SECRET,
  region: process.env.S3_DEFAULT_REGION,
});

const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    metadata: (req: any, file: any, cb: any) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req: any, file: any, cb: any) => {
      cb(null, "files_from_node/" + Date.now().toString() + file.originalname);
    },
  }),
});

export default uploadS3;
