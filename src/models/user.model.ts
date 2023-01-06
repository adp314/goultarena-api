import { Schema, model } from "mongoose";

const userSchema = new Schema({
  userName: {
    type: String,
    default: "Goultarena#0000",
    unique: true,
    require: true,
  },
  email: {
    type: String,
    default: "Goultarena@mail.default",
    unique: true,
    require: true,
  },
  profileImg: { type: [String], default: ["", ""] },
  role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
  countryLocation: { type: String, default: "" },
  sub: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now() },
  auth0lastConnexion: { type: String, default: "" },
  team: { type: String, default: "" },
  rank: { type: String, default: "" },
  points: { type: Number, default: 0 },
});

export const UserModel = model("User", userSchema);
