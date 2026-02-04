import { Types } from "mongoose";

export interface IVerificationCode {
  id?: Types.ObjectId;
  userId: Types.ObjectId;
  code: string;
  expiresAt: Date;
  type: "email-verification" | "password-reset" | "refresh-token";
}
