import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { randomBytes } from "node:crypto";
import { Response, Request } from "express";
import { RequestWithUser } from "../common/types/req";
import emailController from "./emailController";
import { VerificationCode } from "../models/verificationCodes";
import { CODE_EXPIRATION, JWT_LIFETIME } from "../common/constant";

const { JWT_SECRET } = process.env;

class AuthController {
  constructor() {}
  async login(req: RequestWithUser, res: Response) {
    const { email, username, password } = req.body;
    console.log("Logging user in with credentiala", req.body);

    if (!email && !username) {
      return res.status(400).json({
        message: "Username or email is required to login",
      });
    }

    try {
      console.log("looking up user with either username or email");
      let user = null;
      // check for email first
      if (email) {
        user = await User.findOne({ email: email.toLowerCase() });
      }
      if (!user || user == null) {
        user = await User.findOne({ username: username.toLowerCase() });
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          error: "Authentication failed",
          message: "Invalid username or password",
        });
      }

      console.log("comparing password");
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
        console.log("Email not verified, sending verification link to email");
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

      console.log("signing token to store");
      const token = await jwt.sign(
        {
          userId: user._id,
          role: user.role,
        },
        JWT_SECRET ?? "",
        { expiresIn: JWT_LIFETIME }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production",
      });

      return res.status(200).json({
        success: true,
        message: "Login successful",
        token: token,
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
    const { username, email, password, confirmPassword, role } = req.body;

    console.log("Registering user with data", req.body);
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password must match",
      });
    }

    const normalizedEmail = email.toLowerCase();

    try {
      const existingUser = await User.findOne({ email: normalizedEmail });

      console.log("Found existing user");
      if (existingUser)
        return res.status(409).json({ message: "Email already exists" });

      const newUser = new User({
        username: username.toLowerCase(),
        email: normalizedEmail,
        password,
        role,
      });

      await newUser.save();
      console.log("Saved  user successfully");
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
      console.log("Sent verificaion email to user");
      if (response.success) {
        return res.status(201).json({
          success: true,
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

  async verifyEmail(req: Request, res: Response) {
    const { email, token } = req.query;
    const now = new Date(Date.now());

    try {
      if (!email || !token) {
        return res.status(400).json({
          success: false,
          error: "Invalid request",
          description: "email or token is missing",
        });
      }

      const storedToken = await VerificationCode.findOne({ code: token });

      if (!storedToken) {
        return res.status(400).json({
          success: false,
          error: "Invalid token",
        });
      }

      if (storedToken.expiresAt < now) {
        return res.status(400).json({
          success: false,
          error: "Token has expired",
        });
      }

      const isValidToken = token == storedToken.code;

      if (!isValidToken) {
        return res.status(400).json({
          success: false,
          error: "Invalid token",
        });
      }

      User.updateOne({ email }, { emailVerified: true }).exec();

      return res.status(200).json({
        success: true,
        message: "Email verified successfully",
      });
    } catch (error) {
      console.error("Error verifying user email", error);
      return res.status(500).json({
        error: "Internal Server error",
      });
    }
  }
}

export default new AuthController();
