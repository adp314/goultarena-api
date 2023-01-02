import { Schema, model } from "mongoose";
import { generateUsername } from "unique-username-generator";

const userNameGenerate = generateUsername("", 0, 15);

const userSchema = new Schema({
  userName: {
    type: String,
    default: `user_${Math.random()}`,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm,
  },
  role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
  createdAt: { type: Date, default: Date.now() },
});

export const UserModel = model("User", userSchema);
