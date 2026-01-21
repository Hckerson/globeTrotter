import { Request, Response } from "express";
import { RequestWithUser } from "../common/types/req";

class UserController {
  constructor() {}
  async getProfile(req: RequestWithUser, res: Response) {
    console.log(req.user);
    return res.status(200).json({
      name: "hckerson",
    });
  }
}

export default new UserController();
