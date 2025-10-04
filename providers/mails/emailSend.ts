import { resend } from "./connection";
import { EmailTemplates } from "../../lib/templates/email";

const { resetPassword, verifyEmail, loginAlert, welcomeEmail } = EmailTemplates;

type EmailType =
  | "verify-email"
  | "reset-password"
  | "welcome-email"
  | "login-alert";

interface EmailProps {
  from: string;
  to: string[];
  link?: string;
  ua?: string;
  type: EmailType;
}

export async function sendEmail(props: EmailProps) {
  const result = selectTemplate(props);
  try {
    const response = (await resend).emails.send({ ...props, ...result });
    const { data, error } = await response;
    if (error) {
      return { success: false };
    }
    return { success: true };
  } catch (error) {
    console.error("Error sending email", error);
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
