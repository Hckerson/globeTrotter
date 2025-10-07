import { Response } from "express";
import { RequestWithUser } from "../types/req";

export class IteneraryController {
  constructor() {}

  async CreateItenerary(req: RequestWithUser, res: Response) {
    try {
        
    } catch (error) {
      console.error('Error creating itenerary')
      throw error
    }
  }
}

export default new IteneraryController();
