import { services } from "../services";
import { AuthService } from "./auth.service";
import { Request, Response, Router } from "express";
import { AuthError } from "../../common/errors/auth.error";
import { RegisterUserDto } from "../../common/dto/user.dto";

class AuthController {
  private authService: AuthService;
  constructor() {
    this.authService = services.authService;
  }
  async login(req: Request, res: Response) {
    try {
      const { username = "", email = "", role = "", password = "" } = req.body;

      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      throw new AuthError("Internal server error");
    }
  }

  async googleLogin(req: Request, res: Response) {
    return res.json({ message: "Google login successful" });
  }

  async register(req: Request, res: Response) {
    const registerUserData = req.body as RegisterUserDto;
    try {
      const response = await this.authService.register(res, registerUserData);
      
    } catch (error) {
      throw error;
    }
  }

  async verifyEmail() {}
}

export default new AuthController();
