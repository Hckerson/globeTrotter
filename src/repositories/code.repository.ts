import { VerificationCode } from "../models/verification-code";

export class CodeRepository {
  private code: typeof VerificationCode;
  constructor() {
    this.code = VerificationCode;
  }

  async fetchCodeById(id: string, type: string) {
    try {
      const response = await this.code.findOne({
        userId: id,
        type,
      });
      return response;
    } catch (error) {
      console.error("Error fetching verification code", error);
      throw error;
    }
  }
}
