import { UserModel } from "../models/user.model.js";

export default async function attachCurrentUser(req: any, res: any, next: any) {
  try {
    const userData = req.body;

    const user = await UserModel.findOne({ email: userData.email });

    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    req.currentUser = user;

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}
