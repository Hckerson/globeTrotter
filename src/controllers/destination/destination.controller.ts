import { logger } from "../../lib/logger";
import { Request, Response } from "express";
import { DestinationService } from "./destination.service";

class DestinationController {
  private destinationService: DestinationService;
  constructor() {
    this.destinationService = new DestinationService();
  }

  async fetchLocationData(req: Request, res: Response) {
    const queries = req.query;
    const city = queries?.city as string;

    if (!city || !city.trim()) {
      return res.status(400).json({ message: "City is required" });
    }
    try {
      return await this.destinationService.fetchLocationData(res, city);
    } catch (error) {
      logger.error("Error fetching all destinations", error);
      throw error;
    }
  }
}

export default new DestinationController();
