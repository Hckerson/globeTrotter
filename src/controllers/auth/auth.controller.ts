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
    const data = await this.authService.login(req.body);
    return res.status(200).json({
      message: "Login successful",
      data,
    });
  }

  async googleLogin(req: Request, res: Response) {
    return res.json({ message: "Google login successful" });
  }

  async register(req: Request, res: Response) {
    const registerUserData = req.body as RegisterUserDto;
    const user = await this.authService.register(registerUserData);
    return res.status(201).json({
      message: "User registered successfully",
      data: user,
    });
  }

  async verifyEmail(req: Request, res: Response) {
    const { code = "", userId = "" } = req.query;
    await this.authService.verifyEmail(code as string, userId as string);
    return res.status(200).json({ message: "Email verified successfully" });
  }

  async refreshToken(req: Request, res: Response) {
    const header = req.header("authorization");
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const token = header.split("Bearer ")[1];
    const { verified, data } = await verifyAuthHeader(token);
    if (!verified || !data) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const info = { id: data._id, role: data.role };

    const refreshData = await this.authService.refreshToken(info);
    return res.status(200).json({
      message: "Token refreshed successfully",
      data: refreshData,
    });
  }
}

export default new AuthController();
