import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
import { logger } from "../../lib/logger";
import { appConfig } from "../../common/config";
import { RegisterUserDto } from "../../common/dto/user.dto";
import { Nodemailer } from "../../providers/mails/nodemailer";
import { EmailTemplates } from "../../../views/templates/email";
import { VerificationCode } from "../../models/verification-code";
import { UserRepository } from "../../repositories/user.repository";
import { RouteError } from "../../common/errors/route-errors";
import { Types } from "mongoose";

const { jwtSecret = "" } = appConfig.auth;

export class AuthService {
  private user: UserRepository;
  private code: typeof VerificationCode;
  private mailService: Nodemailer;

  constructor() {
    this.user = new UserRepository();
    this.code = VerificationCode;
    this.mailService = new Nodemailer();
  }

  async register(registerDto: RegisterUserDto) {
    const { email = "" } = registerDto;

    try {
      // find existing user
      const existingUser = await this.user.findUserByEmail(email);

      if (existingUser) {
        throw new RouteError("User already exists", 409, {
          data: existingUser,
        });
      }

      // create new user
      const user = await this.user.createNewUser(registerDto);

      if (user) {
        // create verification code

        const verificationCode = await this.code.create({
          type: "email-verification",
          userId: user._id,
          code: randomBytes(32).toString("hex"),
          expiresAt: new Date(Date.now() + 3600000),
        });

        const email = user.email;
        const verificationLink = `${appConfig.app.frontendUrl}/verify-email?code=${verificationCode.code}&userId=${user._id}`;

        const template = EmailTemplates.verifyEmail({
          verificationLink,
        });

        const emailResponse = await this.mailService.sendEmail({
          to: email,
          subject: "Verify your email address",
          html: template.html,
        });
        logger.log("Email sent", emailResponse);

        return user;
      }
      throw new RouteError("User registration failed", 500);
    } catch (error) {
      logger.error("Error registering user", error);
      throw new RouteError("Error registering user");
    }
  }

  async login(loginDto: Partial<RegisterUserDto>) {
    try {
      const { email = "", password = "" } = loginDto;

      // check for user existence

      const existingUser = await this.user.findUserByEmail(email);

      if (!existingUser) {
        throw new RouteError("User not found", 404);
      }

      // check user verification status

      if (!existingUser.emailVerified) {
        try {
          const verificationCode = await this.code.create({
            type: "email-verification",
            userId: existingUser._id,
            code: randomBytes(32).toString("hex"),
            expiresAt: new Date(Date.now() + 3600000),
          });

          const email = existingUser.email;
          const verificationLink = `${appConfig.app.frontendUrl}/verify-email?code=${verificationCode.code}&userId=${existingUser._id}`;

          const template = EmailTemplates.verifyEmail({
            verificationLink,
          });

          const emailResponse = await this.mailService.sendEmail({
            to: email,
            subject: "Verify your email address",
            html: template.html,
          });
          logger.log("Email sent", emailResponse);

          throw new RouteError("User not verified", 401);
        } catch (error) {
          if (error instanceof RouteError) throw error;
          logger.error("Error verifying user", error);
          throw new RouteError("Error verifying user", 500);
        }
      }

      // confirm password
      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password,
      );

      if (!isPasswordValid) {
        throw new RouteError("Invalid password", 401);
      }

      const accessToken = jwt.sign(
        {
          userId: existingUser._id,
          role: existingUser.role,
        },
        jwtSecret,
        { expiresIn: "1h", issuer: appConfig.app.appName },
      );

      const refreshToken = jwt.sign(
        {
          userId: existingUser._id,
          role: existingUser.role,
        },
        jwtSecret,
        { expiresIn: "1d", issuer: appConfig.app.appName },
      );

      await this.code.create({
        type: "refresh-token",
        userId: existingUser._id,
        code: refreshToken,
        expiresAt: new Date(Date.now() + 86400000),
      });

      return {
        accessToken,
        refreshToken,
        role: existingUser.role,
      };
    } catch (error) {
      logger.error("Error logging in user", error);
      throw new RouteError("Error logging in user");
    }
  }

  async verifyEmail(token: string, userId: string) {
    try {
      // fetch verificationCode
      const codeData = await this.code.findOne({
        userId,
        code: token,
        type: "email-verification",
      });

      if (!codeData) throw new RouteError("Invalid verification code", 401);

      const code = codeData.code;
      const expiresAt = codeData.expiresAt;

      // verify code

      if (new Date(expiresAt) < new Date()) {
        throw new RouteError("Verification code expired", 401);
      }

      if (code !== token) {
        throw new RouteError("Invalid verification code", 401);
      }

      // update user status

      await this.user.updateUserById(userId, { emailVerified: true });

    } catch (error) {
      logger.error("Error verifying email", error);
      throw new RouteError("Error verifying email");
    }
  }
  async refreshToken(data: {
    id: Types.ObjectId;
    role: "admin" | "user" | "partner";
  }) {
    try {
      const accessToken = jwt.sign(
        {
          userId: data.id,
          role: data.role,
        },
        jwtSecret,
        { expiresIn: "1h", issuer: appConfig.app.appName },
      );

      const refreshToken = jwt.sign(
        {
          userId: data.id,
          role: data.role,
        },
        jwtSecret,
        { expiresIn: "1d", issuer: appConfig.app.appName },
      );

      await this.code.updateOne(
        { userId: data.id },
        {
          code: refreshToken,
          expiresAt: new Date(Date.now() + 86400000),
        },
      );

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      console.error("Error refreshing token", error);
      throw new RouteError("Error refreshing token");
    }
  }
}
