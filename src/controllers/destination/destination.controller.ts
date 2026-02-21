import { logger } from "../../lib/logger";
import { Request, Response } from "express";
import { DestinationService } from "./destination.service";
import { DestinationFilter } from "../../common/interface/models";

class DestinationController {
  private destinationService: DestinationService;
  constructor() {
    this.destinationService = new DestinationService();
  }

  async fetchLocationData(req: Request, res: Response) {
    const query = req.query as DestinationFilter;
    const { city, ...rest } = query;

    if (!city || !city.trim()) {
      return res.status(400).json({ message: "City or location is required" });
    }
    return await this.destinationService.fetchLocationData(res, city, rest);
  }

  async refreshToken(req: Request, res: Response) {
    return await this.destinationService.refreshToken(res);
  }
}

export default new DestinationController();
