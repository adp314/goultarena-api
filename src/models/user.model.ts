import { Schema, model, Types } from "mongoose";

const userSchema = new Schema({
  userName: {
    type: String,
    default: "",
    unique: true,
    require: true,
    maxlength: 16,
    minlength: 7,
    match: [
      /^[a-zA-Z][a-zA-Z0-9_-]{2,12}#[0-9]{3}$/,
      "Username Goultarena is invalid ",
    ],
  },
  email: {
    type: String,
    default: "",
    unique: true,
    require: true,
  },
  socialNetworkDiscord: {
    type: String,
    default: "",
    maxlength: 25,
    match: [
      /^[a-zA-Z][a-zA-Z0-9_-]{1,20}#[0-9]{4}$/,
      "Username Discord is invalid ",
    ],
  },
  socialNetworkTwitter: {
    type: String,
    default: "",
    maxlength: 15,
    match: [/^@[A-Za-z0-9_]{2,15}$/, "Username Twitter is invalid "],
  },
  role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
  country_location: { type: String, default: "" },
  sub: { type: String, default: "", unique: true, require: true },
  createdAt: { type: Date, default: Date.now() },
  updated_at: { type: String, default: "" },
  team: {
    _teamId: { type: String, default: "" },
    teamName: { type: String, default: "" },
    teamTag: { type: String, default: "" },
  },
  description: { type: String, default: "", maxlength: 128 },
  keyProfileImg: { type: String, default: "FwZGg6BaKLRrK0eMG44hL" },
  characterSkinUploaded: { type: [String], default: ["", ""] },
  playerRankElo: { type: Number, default: 0 },
  playerPoints: { type: Number, default: 0 },
  playerStats: {
    totalWins: { type: Number, default: 0 },
    totalDraws: { type: Number, default: 0 },
    totalLooses: { type: Number, default: 0 },
  },
});

export const UserModel = model("User", userSchema);
