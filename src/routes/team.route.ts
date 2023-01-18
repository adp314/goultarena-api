import express from "express";
import { TeamModel } from "../models/team.model";
import { UserModel } from "../models/user.model";
import { auth } from "express-oauth2-jwt-bearer";

const teamRouter = express.Router();

const checkJwt = auth({
  audience: "goutarena-auth0-api",
  issuerBaseURL: `https://goultarena.eu.auth0.com/`,
});

teamRouter.post("/create", checkJwt, async (req: any, res: any) => {
  try {
    const checkCreator = await TeamModel.findOne({
      teamLeaderId: req.body.teamLeaderId,
    });
    if (!checkCreator) {
      const createNewTeam = await TeamModel.create({ ...req.body });

      if (createNewTeam._id) {
        const updateLeaderUser = await UserModel.findOneAndUpdate(
          { _id: req.body.teamLeaderId },
          {
            $set: {
              team: {
                _teamId: createNewTeam._id,
                teamName: req.body.teamName,
                teamTag: req.body.teamTag,
              },
            },
          },
          { new: true, runValidators: true }
        );
      }
      const updateTeamMembers = await TeamModel.findOneAndUpdate(
        { _id: createNewTeam._id },
        { $set: { teamMembers: [req.body.teamLeaderId] } },
        { new: true, runValidators: true }
      );
      console.log(createNewTeam);
      return res.status(200).json(createNewTeam);
    } else {
      console.log("This User have already a team");
      return res.status(401).json({ msg: "This User have already a team" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

export { teamRouter };
