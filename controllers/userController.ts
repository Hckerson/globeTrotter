import { User } from "../models/model";
import { Request, Response } from "express";

class UserController {
  constructor() {}
  async getProfile(req: Request, res: Response) {
    return res.status(200).json({
      name: "hckerson",
    });
  }


}

export default new UserController();
