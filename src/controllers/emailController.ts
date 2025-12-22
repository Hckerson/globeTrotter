import { FRONTEND_URL } from "../common/constant";
import { EmailType } from "../common/enums/email-type";

const {APP_EMAIL} = process.env

class EmailController {
  constructor() {}

  async sendLoginEmail(email: string, token: string) {
    const endpoint = `${FRONTEND_URL}/verify`;
    const params = new URLSearchParams({
      email,
      token,
    });

    try {
      const verificationLink = `${endpoint}?${params.toString()}`;

      return { success: true };
    } catch (error) {
      console.error("Error sending login email", error);
      throw error;
    }
  }
}

export default new EmailController();
