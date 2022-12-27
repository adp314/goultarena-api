import cors from "cors";
import express from "express";
import * as dotenv from "dotenv";
import { connectToDB } from "./config/db.config";
import { userRouter } from "./routes/user.route";
import * as jwks from "jwks-rsa";
import { expressjwt } from "express-jwt";
import axios from "axios";

dotenv.config();
connectToDB();

const app = express();

const verifyJwt = expressjwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://goultarena.eu.auth0.com/.well-know/jwks.json",
  }),
  audience: "Goutarena unique identifier",
  issuer: "goultarena.eu.auth0.com",
  algorithms: ["RS256"],
});

app.use(verifyJwt);
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from index api route");
});

app.get("/protected", (req, res) => {
  res.send("hello from api protected route");
});

app.use(`/api/user`, userRouter);

app.listen(Number(process.env.PORT), () => {
  console.log(`Server up and running at port ${process.env.PORT}`);
});
