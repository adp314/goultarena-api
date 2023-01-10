import express from "express";
import { TeamModel } from "../models/team.model";
import { auth } from "express-oauth2-jwt-bearer";

const teamRouter = express.Router();

export { teamRouter };
