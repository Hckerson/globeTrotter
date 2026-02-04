import { Request, Response } from "express";
import { RequestWithUser } from "../../common/interface/req";
import { UserRepository } from "../../repositories/user.repository";

class UserController {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }
  async getProfile(req: RequestWithUser, res: Response) {
    const userId = req.query["userId"] as string;
    const user = await this.userRepository.findUserById(userId);
    return res.status(200).json({
      message: "Profile fetch successful",
      user,
    });
  }

  async getAllUser(req: Request, res: Response) {
    const { limit = "10", page = "1", search = "" } = req.query;
    const users = await this.userRepository.fetchAllUsers({
      limit: limit as string,
      page: page as string,
      search: search as string,
    });
    return res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  }
}

export default new UserController();
