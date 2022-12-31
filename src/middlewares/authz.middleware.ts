import * as dotenv from "dotenv";
import { auth } from "express-oauth2-jwt-bearer";


dotenv.config();

export const checkJwt = auth({
  audience: "goutarena-auth0-api",
  issuerBaseURL: `https://goultarena.eu.auth0.com/`,
});
