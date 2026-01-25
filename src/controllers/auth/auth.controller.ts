import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { AuthError } from "../../common/errors/auth.error";
import { RegisterUserDto } from "../../common/dto/user.dto";
import { logger } from "../../lib/logger";

class AuthController {
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }
  async login(req: Request, res: Response) {
    try {
      const { username = "", email = "" } =
        req.body as Partial<RegisterUserDto>;

      if (!username && !email) {
        return res
          .status(400)
          .json({ message: "Username or email is required" });
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

  async verifyEmail(req: Request, res: Response) {
    try {
      const { code = "", userId = "" } = req.query;
      if (!code || !userId)
        return res
          .status(400)
          .json({ message: "Token or userId is missing in request" });

      return await this.authService.verifyEmail(
        res,
        code as string,
        userId as string,
      );
    } catch (error) {
      logger.log("Verify email error", error);
      throw new AuthError("Internal server error");
    }
  }
}

export default new AuthController();
