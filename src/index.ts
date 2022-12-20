import cors from "cors";
import express from "express";
import * as dotenv from "dotenv";
import { connectToDB } from "./config/db.config";
import { userRouter } from "./routes/user.route";


dotenv.config();

connectToDB();

const app = express();

app.use(cors());
app.use(express.json());


app.use(`/api/user`, userRouter);

app.listen(Number(process.env.PORT), () => {
    console.log(`Server up and running at port ${process.env.PORT}`);
});