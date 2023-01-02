import express from "express";
import { UserModel } from "../models/user.model";
import { auth } from "express-oauth2-jwt-bearer";

const userRouter = express.Router();

const checkJwt = auth({
  audience: "Goutarena unique identifier",
  issuerBaseURL: `https://goultarena.eu.auth0.com/`,
});

userRouter.post("/signup", async (req, res) => {
  try {
    const createdUser = await UserModel.create({ ...req.body });
    return res.status(201).json(createdUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

export { userRouter };
