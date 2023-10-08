import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    password: String,
  },
  { timestamps: true }
);

const User = model("user", userSchema);

export default User;
