import { Response } from "express";
import { logger } from "../../lib/logger";
import { AmadeusBaseClass } from "../../providers/api/amadeus/amadeus";

export class DestinationService {
  private amadeusService: AmadeusBaseClass;
  constructor() {
    this.amadeusService = new AmadeusBaseClass();
  }

  async fetchLocationData(res: Response, city: string) {
    try {
      const locationData = await this.amadeusService.fetchLocationData(city);
      return res
        .status(200)
        .json({ message: "Location fetch successful", data: locationData });
    } catch (error) {
      logger.error("Error fetching location attributes", error);
      throw error;
    }
  }

  async refreshToken(res: Response) {
    try {
      const token = await this.amadeusService.requestToken();
      return res
        .status(200)
        .json({ message: "Token refresh successful", data: token });
    } catch (error) {
      logger.error("Error refreshing token", error);
      throw error;
    }
  }
}
