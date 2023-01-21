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
    const fetchUser = await UserModel.findOne({ id: req.query._id });
    console.log(
      `with /fetch route & checkJwt finded id query, user : ${fetchUser?.userName}`
    );
    return res.status(200).json(fetchUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

userRouter.get("/publicfetch", async (req, res) => {
  try {
    const fetchUser = await UserModel.findOne({ _id: req.query._id });
    console.log(`with /publicfetch route, user : ${fetchUser?.userName}`);
    return res.status(200).json(fetchUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

userRouter.get("/publicsubfetch", async (req, res) => {
  try {
    const fetchUser = await UserModel.findOne({ sub: req.query.sub });
    console.log(`with /publicsubfetch route, user : ${fetchUser?.userName}`);
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
      console.log(
        `updated or signup done, the infos returned are : ${updatedUser?.userName}`
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
    const findUserData = await UserModel.findOne({ _id: req.body._id });
    if (findUserData) {
      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: req.body._id },
        { ...req.body },
        { new: true, runValidators: true }
      );
      console.log(` /edit & check validate, user : ${updatedUser?.userName}`);
      return res.status(200).json(updatedUser);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

export { userRouter };
