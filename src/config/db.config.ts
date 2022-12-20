import mongoose from "mongoose";

mongoose.set("strictQuery", false);

export async function connectToDB() {
  try {
    const dbConnect = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(`Connected to db: ${dbConnect.connection.name}`);
  } catch (err) {
    console.log(err);
  }
}