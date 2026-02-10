import { Request, Response } from "express";
import { RequestWithUser } from "../../common/interface/req";
import { UserRepository } from "../../repositories/user.repository";
import { UserService } from "./user.service";

class UserController {
  private userService: UserService
  constructor() {
    this.userService = new UserService();
  }
  async getProfile(req: RequestWithUser, res: Response) {
    const userId = req.query["userId"] as string;
    const user = await this.userService.getProfile(userId);

  }

  async getAllUser(req: Request, res: Response) {
    const { limit = "10", page = "1", search = "" } = req.query;
    const users = await this.userService.getAllUser(limit as string, page as string, search as string);
    return res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  }
}

export default new UserController();
