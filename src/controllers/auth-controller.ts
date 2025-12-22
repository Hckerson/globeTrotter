import { Request, Response, Router } from "express";

class AuthController {
  async login(req: Request, res: Response) {

    return res.json({ message: "Login successful" });
  }

  async register() {}

  async verifyEmail() {}
}

export default new AuthController();
