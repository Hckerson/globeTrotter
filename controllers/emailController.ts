import { FRONTEND_URL } from "../common/constant";
import { EmailType } from "../common/enums/email-type";
import { sendEmail } from "../providers/mails/nodemailer";

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
      await sendEmail({
        to: email,
        link: verificationLink,
        from: APP_EMAIL as string,
        type: EmailType.VERIFY_EMAIL,
      });
      return { success: true };
    } catch (error) {
      console.error("Error sending login email", error);
      throw error;
    }
  }
}

export default new EmailController();
