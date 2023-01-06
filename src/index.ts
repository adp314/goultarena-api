import cors from "cors";
import express from "express";
import * as dotenv from "dotenv";
import { connectToDB } from "./config/db.config";
import { userRouter } from "./routes/user.route";
// import { checkJwt as checkJwtMiddleware } from "./middlewares/authz.middleware";

import { uploadImageRouter } from "./routes/uploadImg.route";
dotenv.config();
connectToDB();

const app = express();

// const checkJwt = auth({
//   audience: "goutarena-auth0-api",
//   issuerBaseURL: `https://goultarena.eu.auth0.com/`,
// });

// app.use(checkJwt);
// app.use(checkJwtMiddleware);
app.use(cors());
app.use(express.json());
app.use(`/api/user`, userRouter);
app.use(`/api/uploadimg`, uploadImageRouter);

// app.use(`/`, uploadImageRouter);

// const verifyJwt = expressjwt({
//   secret: jwks.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 10,
//     jwksUri: "https://goultarena.eu.auth0.com/.well-know/jwks.json",
//   }) as any,
//   audience: "Goutarena unique identifier",
//   issuer: "https://goultarena.eu.auth0.com/",
//   algorithms: ["RS256"],
// }).unless({ path: ["/"] });

// app.get("/protected", async (req: any, res: any) => {
//   try {
//     const accessToken = req.headers.authorization?.split(" ")[1];
//     const response = await axios.get(
//       "https://goultarena.eu.auth0.com/userinfo",
//       {
//         headers: {
//           authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );
//     console.log(accessToken);

//     const userinfo = response.data;
//     res.send(req.user);
//     console.log(userinfo);
//   } catch (error: any) {
//     res.send(error.message);
//   }
// });

// app.get("/api/messages/public-message", (req, res) => {
//   res.send("hello from index public api route");
// });

// app.get(
//   "/api/messages/protected-message",
//   checkJwt,
//   async (req: any, res: any) => {
//     try {
//       const accessToken = req.headers.authorization?.split(" ")[1];
//       const response = await axios.get(
//         "https://goultarena.eu.auth0.com/userinfo",
//         {
//           headers: {
//             authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       const userinfo = response.data;
//       res.json(userinfo);
//       console.log(userinfo);
//     } catch (error: any) {
//       res.send(error.message);
//     }
//   }
// );

// app.use(`/`, userRouter);

app.listen(Number(process.env.PORT), () => {
  console.log(`Server up and running at port ${process.env.PORT}`);
});
