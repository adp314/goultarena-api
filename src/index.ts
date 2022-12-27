import cors from "cors";
import express from "express";
import * as dotenv from "dotenv";
import { connectToDB } from "./config/db.config";
// import { userRouter } from "./routes/user.route";
import * as jwks from "jwks-rsa";
import { expressjwt } from "express-jwt";
import axios from "axios";

dotenv.config();
connectToDB();

const app = express();
app.use(cors());

const verifyJwt = expressjwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: "https://goultarena.eu.auth0.com/.well-know/jwks.json",
  }) as any,
  audience: "Goutarena unique identifier",
  issuer: "https://goultarena.eu.auth0.com/",
  algorithms: ["RS256"],
}).unless({ path: ["/"] });

app.use(verifyJwt);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from index api route");
});

app.get("/protected", async (req: any, res: any) => {
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
    console.log(userinfo);
  } catch (error) {}
});

app.use((req, res, next) => {
  const error = new Error("Not found") as any;
  error.status = 404;
  next(error);
});

app.use((error: any, req: any, res: any, next: any) => {
  const status = error.status || 500;
  const message = error.message || "Internal server error";
  res.status(status).send(message);
});

// app.use(`/api/user`, userRouter);

app.listen(Number(process.env.PORT), () => {
  console.log(`Server up and running at port ${process.env.PORT}`);
});
