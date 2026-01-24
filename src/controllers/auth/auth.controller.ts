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
      const {
        username = "",
        email = "",
      } = req.body as Partial<RegisterUserDto>;

      if (!username || !email) {
        return res.json({ message: "Username or email is required" }).status(400);
      }

      return await this.authService.login(res, req.body);
    } catch (error) {
      throw new AuthError("Internal server error");
    }
  }

  async googleLogin(req: Request, res: Response) {
    return res.json({ message: "Google login successful" });
  }

  async register(req: Request, res: Response) {
    const registerUserData = req.body as RegisterUserDto;
    return await this.authService.register(res, registerUserData);
  }

  async verifyEmail() {}
}

export default new AuthController();
