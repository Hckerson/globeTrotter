import { User } from "../models/model";
import { Request, Response } from "express";

class AuthController {
  constructor() {}
  async login(req: Request, res: Response) {}

  async register(req: Request, res: Response) {
    const { fullName, email, password, confirmPassword } = req.body;

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
        fullName,
        email: normalizedEmail,
        password,
      });

      await newUser.save();

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
