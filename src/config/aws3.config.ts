// import aws from "aws-sdk";
// import { nanoid } from "nanoid";

// const s3 = new aws.S3({
//   accessKeyId: "AKIA2AHL7B3JVQJCUNJ3",
//   secretAccessKey: "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",
//   region: "eu-west-3",
// });

// const key = nanoid();

// export async function awsTestConfig() {
//   try {
//     const post = await s3.createPresignedPost({
//       Bucket: "goultarena-bs3",
//       Fields: {
//         key: key,
//       },
//       Expires: 60, // seconds
//       Conditions: [
//         ["content-length-range", 0, 5048576 * 2], // up to 2 MB
//       ],
//     });
//     console.log(post);
//     return { key, post };
//   } catch (err) {
//     console.log(err);
//   }
// }

// awsTestConfig();
