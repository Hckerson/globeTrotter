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
      logger.error("Error fetching location data", error);
      return res.status(500).json({
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      return await this.destinationService.refreshToken(res);
    } catch (error) {
      logger.error("Error refreshing token", error);
      return res.status(500).json({
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}

export default new DestinationController(); 
