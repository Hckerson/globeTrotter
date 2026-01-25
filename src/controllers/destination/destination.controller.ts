import { logger } from "../../lib/logger";
import { Request, Response } from "express";
import { DestinationService } from "./destination.service";

class DestinationController {
  private destinationService: DestinationService;
  constructor() {
    this.destinationService = new DestinationService();
  }

  async fetchAllDestination(req: Request, res: Response) {
    const { city = "" } = req.params;
    try {
    } catch (error) {
      logger.error("Error fetching all destinations", error);
    }
  }
}

export default new DestinationController();
