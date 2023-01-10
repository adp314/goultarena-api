import { Schema, model } from "mongoose";

const teamSchema = new Schema({
  teamName: { type: String, default: "" },
  tagName: { type: String, default: "" },
  teamDescription: { type: String, default: "" },
  keyTeamImg: { type: String, default: "" },
  totalTeamScore: { type: String, default: "" },
  teamPassword: { type: String, default: "" },
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
