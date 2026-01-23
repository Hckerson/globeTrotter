import { Response } from "express";
import { randomBytes } from "crypto";
import { User } from "../../models/user";
import { config } from "../../common/config";
import { RegisterUserDto } from "../../common/dto/user.dto";
import { AuthError } from "../../common/errors/auth.error";
import { Nodemailer } from "../../providers/mails/connection";
import { EmailTemplates } from "../../../views/templates/email";
import { VerificationCode } from "../../models/verification-code";
import { logger } from "../../lib/logger";

export class AuthService {
  private user: typeof User;
  private code: typeof VerificationCode;
  private mailService: Nodemailer;
  constructor() {
    this.user = User;
    this.code = VerificationCode;
    this.mailService = new Nodemailer();
  }

  async register(res: Response, registerDto: RegisterUserDto) {
    const { email = "" } = registerDto;

    try {
      // find existing user
      const existingUser = await this.user.findOne({ email });

      if (existingUser)
        return res
          .json({
            message: "User already exists",
            data: existingUser,
          })
          .status(409);

      // create new user
      const user = await this.user.create(registerDto);

      if (user) {
        // create verification code

        const verificationCode = await this.code.create({
          type: "email-verification",
          userId: user._id,
          code: randomBytes(32).toString("hex"),
          expiresAt: new Date(Date.now() + 3600000),
        });

        const email = user.email;
        const verificationLink = `${config.app.frontendUrl}/verify-email?code=${verificationCode.code}`;

        const template = EmailTemplates.verifyEmail({
          verificationLink,
        });

        const emailResponse = await this.mailService.sendEmail({
          to: email,
          subject: "Verify your email address",
          html: template.html,
        });

        logger.log("Email sent", emailResponse);

        return res
          .json({
            message: "User registered successfully",
            data: user,
          })
          .status(201);
      }
    } catch (error) {
      console.error("Error registering user");
      throw new AuthError("Error registering user");
    }
  }
}
