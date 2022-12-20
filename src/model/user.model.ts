import { Schema, model } from "mongoose";

const userSchema = new Schema({
    userName: {
      type: String,
      required: true,
      unique: true,
      match: /^[A-z0-9]{3,15}$/gm
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm
    },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
    createdAt: { type: Date, default: Date.now() },
    
  });
  
  export const UserModel = model("User", userSchema);