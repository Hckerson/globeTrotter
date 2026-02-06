import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Response } from "express";
import { randomBytes } from "crypto";
import { User } from "../../models/user";
import { logger } from "../../lib/logger";
import { config } from "../../common/config";
import { RegisterUserDto } from "../../common/dto/user.dto";
import { AuthError } from "../../common/errors/error";
import { Nodemailer } from "../../providers/mails/connection";
import { EmailTemplates } from "../../../views/templates/email";
import { VerificationCode } from "../../models/verification-code";
import { UserRepository } from "../../repositories/user.repository";

const { jwtSecret = "" } = config.auth;

export class AuthService {
  private user: UserRepository;
  private code: typeof VerificationCode;
  private mailService: Nodemailer;

  constructor() {
    this.user = new UserRepository();
    this.code = VerificationCode;
    this.mailService = new Nodemailer();
  }

  async register(res: Response, registerDto: RegisterUserDto) {
    const { email = "" } = registerDto;

    try {
      // find existing user
      const existingUser = await this.user.findUserByEmail(email);

      if (existingUser)
        return res
          .json({
            message: "User already exists",
            data: existingUser,
          })
          .status(409);

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
        const verificationLink = `${config.app.frontendUrl}/verify-email?code=${verificationCode.code}&userId=${user._id}`;

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
      logger.error("Error registering user");
      throw new AuthError("Error registering user");
    }
  }

  async login(res: Response, loginDto: Partial<RegisterUserDto>) {
    try {
      const { email = "", password = "" } = loginDto;

      // check for user existence

      const existingUser = await this.user.findUserByEmail(email);

      if (!existingUser) {
        return res.json({ message: "User not found" }).status(404);
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
          const verificationLink = `${config.app.frontendUrl}/verify-email?code=${verificationCode.code}&userId=${existingUser._id}`;

          const template = EmailTemplates.verifyEmail({
            verificationLink,
          });

          const emailResponse = await this.mailService.sendEmail({
            to: email,
            subject: "Verify your email address",
            html: template.html,
          });
          logger.log("Email sent", emailResponse);

          return res.status(401).json({ message: "User not verified" });
        } catch (error) {
          logger.error("Error verifying user");
          throw new AuthError("Error verifying user");
        }
      }

      // confirm password
      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password,
      );

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const accessToken = jwt.sign(
        {
          userId: existingUser._id,
          role: existingUser.role,
        },
        jwtSecret,
        { expiresIn: "1h", issuer: config.app.appName },
      );

      const refreshToken = jwt.sign(
        {
          userId: existingUser._id,
          role: existingUser.role,
        },
        jwtSecret,
        { expiresIn: "1d", issuer: config.app.appName },
      );

      await this.code.create({
        type: "refresh-token",
        userId: existingUser._id,
        code: refreshToken,
        expiresAt: new Date(Date.now() + 86400000),
      });

      return res.status(200).json({
        message: "Login successful",
        data: {
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      logger.error("Error logging in user");
      throw new AuthError("Error logging in user");
    }
  }

  async verifyEmail(res: Response, token: string, userId: string) {
    try {
      // fetch verificationCode
      const codeData = await this.code.findOne({
        userId,
        code: token,
        type: "email-verification",
      });

      if (!codeData)
        return res.status(401).json({ message: "Invalid verification code" });

      const code = codeData.code;
      const expiresAt = codeData.expiresAt;

      // verify code

      if (new Date(expiresAt) < new Date()) {
        return res.status(401).json({ message: "Verification code expired" });
      }

      if (code !== token) {
        return res.status(401).json({ message: "Invalid verification code" });
      }

      // update user status

      await this.user.updateUserById(userId, { emailVerified: true });

      return res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
      logger.error("Error verifying email", error);
      throw new AuthError("Error verifying email");
    }
  }

  async refreshToken(res: Response, data: any) {
    try {
      const accessToken = jwt.sign(
        {
          userId: data._id,
          role: data.role,
        },
        jwtSecret,
        { expiresIn: "1h", issuer: config.app.appName },
      );

      const refreshToken = jwt.sign(
        {
          userId: data._id,
          role: data.role,
        },
        jwtSecret,
        { expiresIn: "1d", issuer: config.app.appName },
      );

      await this.code.updateOne(
        { _id: data._id },
        {
          code: refreshToken,
          expiresAt: new Date(Date.now() + 86400000),
        },
      );

      return res.status(200).json({
        message: "Token refreshed successfully",
        data: {
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      console.error("Error refreshing token", error);
      throw new AuthError("Error refreshing token");
    }
  }
}
