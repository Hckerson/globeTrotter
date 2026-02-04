import mongoose from "../providers/database/connection";
import { IVerificationCode } from "../common/interface/models";

const { Schema, model } = mongoose;

const verificationCodeSchema = new Schema<IVerificationCode>({
  userId: {
    type: Schema.Types.ObjectId,
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
  type: {
    type: String,
    enum: ["email-verification", "password-reset", "refresh-token"],
    required: true,
  },
});

const VerificationCode = model("VerificationCode", verificationCodeSchema);

export { VerificationCode, verificationCodeSchema };
