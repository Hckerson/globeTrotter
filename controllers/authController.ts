import * as bcrypt from "bcryptjs";
import {  Response } from "express";
import * as jwt from "jsonwebtoken";
import { User } from "../models/user";
import { randomBytes } from "node:crypto";
import { RequestWithUser } from "../types/req";
import emailController from "./emailController";
import { VerificationCode } from "../models/verificationCodes";
import {
  CODE_EXPIRATION,
  JWT_LIFETIME,
} from "../common/constant";

const { JWT_SECRET } = process.env;

class AuthController {
  constructor() {}
  async login(req: RequestWithUser, res: Response) {
    const { email, username, password } = req.body;

    if (!password) {
      return res.status(400).json({
        message: "Password is required",
      });
    }

    try {
      let user = null;
      // check for email first
      user = await User.findOne({ email });

      if (!user || user == null) {
        user = await User.findOne({ email });
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          error: "Authentication failed",
          message: "Invalid username or password",
        });
      }

      const storedHash = user.password;
      const isValid = await bcrypt.compare(password, storedHash);

      if (!isValid) {
        return res.status(401).json({
          success: false,
          error: "Authentication failed",
          message: "Invalid username or password",
        });
      }

      if (!user.emailVerified) {
        try {
          // send verification email
          const token = randomBytes(32).toString("hex");
          const expiresAt = new Date(Date.now() + CODE_EXPIRATION);

          const code = new VerificationCode({
            userId: user._id,
            code: token,
            expiresAt,
          });

          await code.save();

          const response = await emailController.sendLoginEmail(email, token);

          if (response.success) {
            return res.status(401).json({
              error: "Email not verified",
              message:
                "Please verify your email before logging in, A new verification email has been sent to your imbox",
            });
          }
        } catch (error) {
          console.error("Error sending verification email", error);
          return res.status(500).json({
            error: "Server error",
          });
        }
      }

      const token = await jwt.sign(
        {
          userId: user.id,
          role: user.role,
        },
        JWT_SECRET ?? "",
        { expiresIn: JWT_LIFETIME }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production",
      });

      req.user = { id: user._id, role: user.role as string };

      return res.status(200).json({
        success: true,
        message: "Login successful",
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          success: false,
          error: "Server error",
          message: error.message,
        });
      }
      console.error("Error logging user in", error);
    }
  }

  async register(req: RequestWithUser, res: Response) {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password must match",
      });
    }

    const normalizedEmail = email.toLowerCase();

    try {
      const existingUser = await User.findOne({ email: normalizedEmail });

      if (existingUser)
        return res.status(409).json({ message: "Email already exists" });

      const newUser = new User({
        username: username.toLowerCase(),
        email: normalizedEmail,
        password,
      });

      await newUser.save();

      const userId = newUser._id;
      // send verification email
      const token = randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + CODE_EXPIRATION);

      const code = new VerificationCode({
        userId,
        code: token,
        expiresAt,
      });

      await code.save();

      const response = await emailController.sendLoginEmail(email, token);

      if (response.success) {
        return res.status(201).json({
          message: "Sign up successfull",
          description: "Verification email has been sent to your imbox",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          error: error.message,
        });
      }
      console.log("Error registering user", error);
    }
  }
}

export default new AuthController();
