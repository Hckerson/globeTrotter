import { Response } from "express";
import { logger } from "../../lib/logger";
import { IteneraryService } from "./itenerary.service";
import { IItenerary } from "../../common/interface/models";
import { RequestWithUser } from "../../common/interface/req";

export class IteneraryController {
  private iteneraryService: IteneraryService;
  constructor() {
    this.iteneraryService = new IteneraryService();
  }

  /**
   *
   * @param req -Request object to extract the new iteneray information
   * @param res
   */
  async createItenerary(req: RequestWithUser, res: Response) {
    const itenerary = req.body as Partial<IItenerary>;
    const { iteneraryItems } = itenerary;
    logger.log("Creating itenerary with object", req.body);

    if (!iteneraryItems || iteneraryItems.length < 1) {
      return res.status(400).json({
        error: "Invalid payload",
        message: "iteneraryitems must contain at least one thing",
      });
    }

    return await this.iteneraryService.createItenerary(itenerary);
  }
}

export default new IteneraryController();
