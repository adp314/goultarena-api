import express from "express";
import { UserModel } from "../models/user.model";
import { TeamModel } from "../models/team.model";

const directoryRouter = express.Router();

directoryRouter.get("/usersfetch", async (req, res) => {
  let pageNumber = Number(req.query.page);
  try {
    if (pageNumber) {
      const fetchDirectoryUser = await UserModel.find(
        {},
        { userName: 1, keyProfileImg: 1, playerStats: 1, playerPoints: 1 }
      )
        .sort({
          userName: 1,
        })
        .skip(pageNumber > 0 ? (pageNumber - 1) * 100 : 0)
        .limit(100);

      console.log(fetchDirectoryUser);
      return res.status(200).json(fetchDirectoryUser);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

directoryRouter.get("/teamsfetch", async (req, res) => {
  let pageNumber = Number(req.query.page);
  try {
    if (pageNumber) {
      const fetchDirectoryTeam = await TeamModel.find(
        {},
        {
          teamName: 1,
          teamTag: 1,
          teamKeyImg: 1,
          teamAllStatsCount: 1,
          totalTeamPointsScore: 1,
        }
      )
        .sort({
          teamName: 1,
        })
        .skip(pageNumber > 0 ? (pageNumber - 1) * 100 : 0)
        .limit(100);

      console.log(fetchDirectoryTeam);
      return res.status(200).json(fetchDirectoryTeam);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

export { directoryRouter };
