import express from "express";
import { UserModel } from "../models/user.model";
import { auth } from "express-oauth2-jwt-bearer";
import { generateUsername } from "unique-username-generator";

const userRouter = express.Router();

function generateSignInUserName() {
  const userNameGenerate = generateUsername("", 0, 10);
  return `${userNameGenerate}#${Math.floor(Math.random() * 10)}${Math.floor(
    Math.random() * 10
  )}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`;
}

const checkJwt = auth({
  audience: "Goutarena unique identifier",
  issuerBaseURL: `https://goultarena.eu.auth0.com/`,
});

// userRouter.post("/signup", async (req, res) => {
//   try {
//     const createdUser = await UserModel.create({ ...req.body });
//     return res.status(201).json(createdUser);
//   } catch (err) {
//     console.log(err);
//     console.log(err);
//     return res.status(500).json(err);
//   }
// });

userRouter.post("/signup", async (req, res) => {
  try {
    const createdUser = await UserModel.create({
      ...req.body,
      userName: generateSignInUserName(),
    });
    console.log(createdUser);

    return res.status(201).json(createdUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

export { userRouter };
