import { Schema, model, Types } from "mongoose";

const teamSchema = new Schema({
  teamName: { type: String, default: "" },
  teamTag: { type: String, default: "" },
  teamDescription: { type: String, default: "" },
  teamKeyImg: { type: String, default: "" },
  teamLeaderId: { type: Types.ObjectId, ref: "User" },
  teamMembers: [{ type: Types.ObjectId, ref: "User" }],
  teamSecretCode: { type: String, default: "" },
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
