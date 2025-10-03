import { randomUUID } from "crypto";
import mongoose from "../database/connection";

const { Schema, model } = mongoose;

const verificationCodeSchema = new Schema({
  _id: {
    type: "UUID",
    default: () => randomUUID(),
  },
  userId: {
    type: String,
    required: true,
    unique: true,
    ref: "User",
  },
  code: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

const VerificationCode = model("VerificationCode", verificationCodeSchema);

export { VerificationCode, verificationCodeSchema };
