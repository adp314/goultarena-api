import { expressjwt } from "express-jwt";
import * as dotenv from "dotenv";

dotenv.config();

const tokenSignSecret = process.env.TOKEN_SIGN_SECRET as string;

export default expressjwt({
    secret: tokenSignSecret,
    algorithms: ["HS256"],
});