import * as bcrypt from "bcryptjs";
import { User } from "../models/user";
import { randomBytes } from "node:crypto";
import { Request, Response } from "express";
import { RequestWithUser } from "../types/req";
import { CODE_EXPIRATION } from "../common/constant";
import { VerificationCode } from "../models/verificationCodes";

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
      const user = await User.findOne({ email });

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

      new VerificationCode({
        userId,
        code: token,
        expiresAt
      });

      return res.status(201).json({
        message: "Sign up successfull",
      });
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
