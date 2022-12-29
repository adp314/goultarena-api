import cors from "cors";
import express from "express";
import * as dotenv from "dotenv";
import { connectToDB } from "./config/db.config";
import { auth } from "express-oauth2-jwt-bearer";
import axios from "axios";

dotenv.config();
connectToDB();

const app = express();
app.use(cors());
app.use(express.json());

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

const checkJwt = auth({
  audience: "Goutarena unique identifier",
  issuerBaseURL: `https://goultarena.eu.auth0.com/`,
});

app.get("/", (req, res) => {
  res.send("hello from index api route");
});

app.get("/protected", checkJwt, async (req: any, res: any) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];
    const response = await axios.get(
      "https://goultarena.eu.auth0.com/userinfo",
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const userinfo = response.data;
    res.json(userinfo);
    console.log(userinfo);
  } catch (error: any) {
    res.send(error.message);
  }
});

// app.use(`/`, userRouter);

app.listen(Number(process.env.PORT), () => {
  console.log(`Server up and running at port ${process.env.PORT}`);
});
