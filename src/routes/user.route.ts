// import express from "express";
// // import { generateToken } from "../config/jwt.config";
// // import isAuth from "../middlewares/isAuth";
// // import attachCurrentUser from "../middlewares/attachCurrentUser";
// //import { isAdmin } from "../middlewares/isAdmin";
// import { UserModel } from "../models/user.model";

// import bcrypt from "bcrypt";

// const SALT_ROUNDS: number = 10;

// const userRouter = express.Router();

// userRouter.post("/signup", async (req, res) => {
//   try {
//     const { password } = req.body;

//     if (
//       !password ||
//       !password.match(
//         /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm
//       )
//     ) {
//       return res.status(400).json({
//         msg: "Password not valid. min Aa8!",
//       });
//     }

//     const salt = await bcrypt.genSalt(SALT_ROUNDS);

//     const hashedPassword = await bcrypt.hash(password, salt);

//     const createdUser: any = await UserModel.create({
//       ...req.body,
//       passwordHash: hashedPassword,
//     });

//     delete createdUser._doc.passwordHash;
//     return res.status(201).json(createdUser);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json(err);
//   }
// });

// userRouter.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await UserModel.findOne({ email: email });

//     if (!user) {
//       return res.status(404).json({ msg: "Email or password not valid." });
//     }

//     if (await bcrypt.compare(password, user.passwordHash)) {
//       const token = generateToken(user);

//       return res.status(200).json({
//         user: {
//           name: user.userName,
//           email: user.email,
//           _id: user._id,
//           role: user.role,
//         },
//         token: token,
//       });
//     } else {
//       return res.status(401).json({ msg: "Email or password not valid." });
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json(err);
//   }
// });

// // userRouter.get(
// //   "/profile",
// //   isAuth,
// //   attachCurrentUser,
// //   async (req: any, res: any) => {
// //     const user = await UserModel.findOne({ _id: req.currentUser._id });
// //     return res.status(200).json(user);
// //   }
// // );

// userRouter.delete(
//   "/delete",
//   isAuth,
//   attachCurrentUser,
//   async (req: any, res: any) => {
//     try {
//       const loggedInUser = req.currentUser;

//       const deleteUser = await UserModel.deleteOne({
//         _id: loggedInUser._id,
//       });
//       return res.status(200).json(deleteUser);
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json(err);
//     }
//   }
// );

// userRouter.put(
//   "/edit",
//   isAuth,
//   attachCurrentUser,
//   async (req: any, res: any) => {
//     try {
//       const loggedInUser = req.currentUser;

//       const updatedUser = await UserModel.findOneAndUpdate(
//         { _id: loggedInUser._id },
//         { ...req.body },
//         { new: true, runValidators: true }
//       );

//       return res.status(200).json(updatedUser);
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json(err);
//     }
//   }
// );

// userRouter.get("/", (req, res) => {
//   res.send("hello from index api route");
// });

// userRouter.get("/protected", (req, res) => {
//   res.send("hello from api protected route");
// });

// export { userRouter };
