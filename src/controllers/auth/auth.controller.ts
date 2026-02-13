import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { RegisterUserDto } from "../../common/dto/user.dto";
import { verifyAuthHeader } from "../../common/middleware/auth-middleware";

class AuthController {
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }
  async login(req: Request, res: Response) {
    const { username = "", email = "" } = req.body as Partial<RegisterUserDto>;

    if (!username && !email) {
      return res.status(400).json({ message: "Username or email is required" });
    }
    return await this.authService.login(res, req.body);
  }

  async googleLogin(req: Request, res: Response) {
    return res.json({ message: "Google login successful" });
  }

  async register(req: Request, res: Response) {
    const registerUserData = req.body as RegisterUserDto;
    return await this.authService.register(res, registerUserData);
  }

  async verifyEmail(req: Request, res: Response) {
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
  }

  async refreshToken(req: Request, res: Response) {
    const header = req.header("authorization");
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const token = header.split("Bearer ")[1];
    const { verified, data } = await verifyAuthHeader(token);
    if (!verified) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return await  this.authService.refreshToken(res, data);
  }
}

export default new AuthController();
