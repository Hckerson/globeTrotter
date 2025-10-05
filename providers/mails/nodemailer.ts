import "dotenv/config";
import * as nodemailer from "nodemailer";
import { SendMailOptions } from "nodemailer";

import { EmailTemplates } from "../../lib/templates/email";

export type EmailType =
  | "verify-email"
  | "reset-password"
  | "welcome-email"
  | "login-alert";

interface EmailProps {
  from: string;
  to: string;
  link?: string;
  ua?: string;
  type: EmailType;
}

const { verifyEmail, resetPassword, loginAlert, welcomeEmail } = EmailTemplates;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_USERNAME || "",
    pass: process.env.APP_PASSWORD || "",
  },
});

export async function sendEmail(props: EmailProps) {
  const result = selectTemplate(props);
  try {
    const info = await transporter.sendMail({
      ...props,
      ...result,
    });
    console.log("Message sent: %s", info.messageId);
    if (!info) return { success: false, message: "Email not sent" };
    return { success: true, message: "Email sent" };
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    throw error;
  }
}

const selectTemplate = (props: EmailProps) => {
  const { ua, link = "", to } = props;
  switch (props.type) {
    case "login-alert":
      return loginAlert({
        ua,
        timeISO: new Date().toLocaleDateString(),
      });
    case "reset-password":
      return resetPassword({ resetLink: link });
    case "verify-email":
      return verifyEmail({ verificationLink: link });
    case "welcome-email":
      return welcomeEmail({ name: to[0].split("@")[0] });
  }
};
