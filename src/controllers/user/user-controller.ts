import { Response } from "express";
import { RequestWithUser } from "../../common/interface/req.interface";
import { UserService } from "./user.service";

class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }
  async getProfile(req: RequestWithUser, res: Response) {
    const userId = req.query["userId"] as string;
    const user = await this.userService.getProfile(userId);
    return res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  }


}

export default new UserController();
