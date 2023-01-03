import express from "express";
import { UserModel } from "../models/user.model";
import { auth } from "express-oauth2-jwt-bearer";
import { generateUsername } from "unique-username-generator";
import attachCurrentUser from "../middlewares/attachCurrentUser";

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

userRouter.put("/updateorcreate", async (req: any, res: any) => {
  try {
    const userData = await UserModel.findOne({ email: req.body.email });

    if (userData) {
      const updatedUser = await UserModel.findOneAndUpdate(
        { email: req.body.email },
        { ...req.body },
        { new: true, runValidators: true }
      );
      return res.status(200).json(updatedUser);
    } else {
      const createNewUser = await UserModel.create({
        ...req.body,
        userName: generateSignInUserName(),
      });
      console.log(createNewUser);

      return res.status(201).json(createNewUser);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

export { userRouter };
