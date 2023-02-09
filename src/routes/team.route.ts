import express from "express";
import { TeamModel } from "../models/team.model";
import { UserModel } from "../models/user.model";
import { auth } from "express-oauth2-jwt-bearer";
import { Types } from "mongoose";
import mongoose from "mongoose";

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
                _teamId: createNewTeam._id.toString(),
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

teamRouter.get("/fetch", checkJwt, async (req, res) => {
  try {
    const fetchTeam = await TeamModel.findOne({ _id: req.query._id });

    console.log(`with /fetch route & checkJwt, user : ${fetchTeam?.teamName}`);
    return res.status(200).json(fetchTeam);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

teamRouter.get("/publicfetchbyteamid", async (req, res) => {
  try {
    const fetchTeam = await TeamModel.findOne({ _id: req.query.id });
    console.log(`with /fetch route im in team, user : ${fetchTeam?.teamName}`);
    return res.status(200).json(fetchTeam);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

teamRouter.get("/publicfetchbyuserid", async (req, res) => {
  try {
    const fetchTeam = await TeamModel.findOne({
      teamLeaderId: req.query.teamleader,
    });
    console.log(`with  team/publicfetchbyuserid : ${fetchTeam?.teamName}`);
    return res.status(200).json(fetchTeam);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

teamRouter.put("/postulation", async (req, res) => {
  try {
    const checkTeam = await TeamModel.findOne({
      _id: req.body.teamId,
    });
    const checkUser = await UserModel.findOne({
      _id: req.body.userId,
    });
    if (checkTeam && checkUser) {
      const team = await TeamModel.findOne({ _id: req.body.teamId });

      if (team?.teamSecretCode !== req.body.secretCode) {
        return (
          res.status(400).json({ message: "Incorrect secret code" }) &&
          console.log("Incorrect secret code")
        );
      }

      if (team?.teamPostulations.includes(req.body.userId)) {
        return (
          res.status(400).json({ message: "User already postulated" }) &&
          console.log("User already postulated")
        );
      } else if (team?.teamMembers.includes(req.body.userId)) {
        return (
          res.status(400).json({ message: "User already in the team" }) &&
          console.log("User already in the team")
        );
      }

      const updateTeamPostulations = await TeamModel.findOneAndUpdate(
        { _id: req.body.teamId },
        { $push: { teamPostulations: req.body.userId } },
        { new: true, runValidators: true }
      );
      console.log(updateTeamPostulations);
    }

    return res.status(200).json({ message: "Postulation sent !" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

teamRouter.get("/postulationsfetch", async (req, res) => {
  try {
    const fetchPostulationIds = await TeamModel.findOne(
      { _id: req.query.teamid },
      { teamPostulations: 1 }
    );

    if (fetchPostulationIds) {
      const fetchPostulationUserData = await UserModel.find({
        _id: { $in: fetchPostulationIds.teamPostulations },
      });

      return (
        res.status(200).json(fetchPostulationUserData) &&
        console.log(fetchPostulationUserData)
      );
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

teamRouter.put("/acceptpostulation", async (req, res) => {
  try {
    const teamCheck = await TeamModel.findOne({ _id: req.query.teamid });
    const userCheck = await UserModel.findOne({ _id: req.query.userid });

    const teamId = teamCheck?._id.toString();
    const userId = userCheck?._id.toString();

    if (!teamCheck?.teamMembers.includes(userId as string)) {
      if (teamCheck && userCheck && userCheck.team) {
        teamCheck.teamMembers.push(userId as string);

        userCheck.team._teamId = teamId as string;

        const updateTeam = await teamCheck.save();
        const updatedUser = await userCheck.save();

        return (
          res.status(200).json() &&
          console.log(teamCheck.teamMembers && userCheck.team._teamId)
        );
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

export { teamRouter };
