import { randomUUID } from "crypto";
import mongoose from "../providers/database/connection";

const { Schema, model } = mongoose;

const verificationCodeSchema = new Schema({
  userId: {
    type: String,
    required: true,
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
