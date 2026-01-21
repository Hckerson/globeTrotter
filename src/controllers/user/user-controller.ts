import { Request, Response } from "express";
import { RequestWithUser } from "../../common/interface/req";
import { UserRepository } from "../../repositories/user.repository";
class UserController {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }
  async getProfile(req: RequestWithUser, res: Response) {
    console.log(req.user);
    return res.status(200).json({
      name: "hckerson",
    });
  }

  async getAllUser(req: Request, res: Response) {
    const users = await this.userRepository.fetchAllUsers();
    return res.status(200).json({
      users,
    });
  }
}

export default new UserController();
