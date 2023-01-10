import express from "express";
import { UserModel } from "../models/user.model";
import { auth } from "express-oauth2-jwt-bearer";
import { generateUsername } from "unique-username-generator";
// import attachCurrentUser from "../middlewares/attachCurrentUser";

const userRouter = express.Router();

function generateSignInUserName() {
  const userNameGenerate = generateUsername("", 0, 10);
  return `${userNameGenerate}#${Math.floor(Math.random() * 10)}${Math.floor(
    Math.random() * 10
  )}${Math.floor(Math.random() * 10)}`;
}

const checkJwt = auth({
  audience: "goutarena-auth0-api",
  issuerBaseURL: `https://goultarena.eu.auth0.com/`,
});

// userRouter.post("/signup", async (req, res) => {
//   try {
//     const createdUser = await UserModel.create({
//       ...req.body,
//       userName: generateSignInUserName(),
//     });
//     console.log(createdUser);

//     return res.status(201).json(createdUser);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json(err);
//   }
// });

userRouter.get("/fetch", checkJwt, async (req, res) => {
  try {
    const fetchUser = await UserModel.findOne({ email: req.query.email });
    console.log(fetchUser);
    return res.status(200).json(fetchUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

userRouter.put("/updateorsignup", checkJwt, async (req: any, res: any) => {
  try {
    const userData = await UserModel.findOne({ sub: req.body.sub });

    if (userData) {
      const updatedUser = await UserModel.findOneAndUpdate(
        { sub: req.body.sub },
        { ...req.body },
        { new: true, runValidators: true }
      );
      return res.status(200).json(updatedUser);
    } else {
      const createNewUser = await UserModel.create({
        ...req.body,
        userName: generateSignInUserName(),
      });

      return res.status(201).json(createNewUser);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

userRouter.put("/edit", checkJwt, async (req: any, res: any) => {
  try {
    const findUserData = await UserModel.findOne({ sub: req.body.sub });
    if (findUserData) {
      const updatedUser = await UserModel.findOneAndUpdate(
        { sub: req.body.sub },
        { ...req.body },
        { new: true, runValidators: true }
      );
      return res.status(200).json(updatedUser);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

export { userRouter };
