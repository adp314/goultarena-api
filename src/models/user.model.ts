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

  profileImg: { type: String, default: "urloftheprofilepicture" },

  role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },

  countryLocation: { type: String, default: "NoCountryLocation" },

  sub: { type: String, default: "NoSub" },

  createdAt: { type: Date, default: Date.now() },

  auth0lastConnexion: { type: String, default: "NoLastConnexion" },

  team: { type: String, default: "NoTeam" },

  rank: { type: String, default: "NoRank" },

  points: { type: Number, default: 0 },
});

export const UserModel = model("User", userSchema);
