import { Schema, model } from "mongoose";
import User from "./userSchema.js";

const messageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    text: String,
  },
  { timeStamps: true }
);

const Message = model("message", messageSchema);

export default Message;
