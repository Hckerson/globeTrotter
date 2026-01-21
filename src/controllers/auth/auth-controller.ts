import { Request, Response, Router } from "express";
import { AuthError } from "../../common/errors/auth.error";

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { username, email, role, password } = req.body;
      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      throw new AuthError("Internal server error");
    }
  }

  async googleLogin(req: Request, res: Response) {
    return res.json({ message: "Google login successful" });
  }

  async register() {}

  async verifyEmail() {}
}

export default new AuthController();
