import { User } from "../models/model";
import { Request, Response } from "express";
import { RequestWithUser } from "../types/req";

class UserController {
  constructor() {}
  async getProfile(req: RequestWithUser, res: Response) {
    
    return res.status(200).json({
      name: "hckerson",
    });
  }


}

export default new UserController();
