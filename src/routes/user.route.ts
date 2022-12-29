import express from "express";
import attachCurrentUser from "../middlewares/attachCurrentUser";
import { isAdmin } from "../middlewares/isAdmin";
import { UserModel } from "../models/user.model";
import { auth } from "express-oauth2-jwt-bearer";

const userRouter = express.Router();

const checkJwt = auth({
  audience: "Goutarena unique identifier",
  issuerBaseURL: `https://goultarena.eu.auth0.com/`,
});
