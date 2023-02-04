import { Schema, model, Types } from "mongoose";

const teamSchema = new Schema({
  teamName: { type: String, default: "", maxlength: 15, minlength: 2 },
  teamTag: { type: String, default: "", maxlength: 3, minlength: 1 },
  teamDescription: { type: String, default: "", maxlength: 128 },
  teamKeyImg: { type: String, default: "" },
  teamLeaderId: { type: String, unique: true, require: true },
  teamMembers: [{ type: String, unique: true }],
  teamSecretCode: { type: String, default: "" },
  teamPostulations: [{ type: String, unique: true }],
  totalTeamPointsScore: { type: Number, default: 0 },
  teamLaddersInCourse: { type: [String] },
  allTeamLaddersFinish: { type: [String] },
  teamAllStatsCount: {
    Wins: { type: Number, default: 0 },
    Draws: { type: Number, default: 0 },
    Looses: { type: Number, default: 0 },
  },
  allTeamMatchInCourse: [{ type: String, default: "" }],
  allTeamMatchsFinish: [{ type: String, default: "" }],
});

export const TeamModel = model("Team", teamSchema);
