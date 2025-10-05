import { FRONTEND_URL } from "../common/constant";
import { EmailType } from "../common/enums/email-type";
import { sendEmail } from "../providers/mails/emailSend";

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
        to: [email],
        link: verificationLink,
        from: FRONTEND_URL,
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
