export interface IVerificationCode {
  id?: string;
  userId: string;
  code: string;
  expiresAt: Date;
  type: "email-verification" | "password-reset" | "refresh-token";
}
