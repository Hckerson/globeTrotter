import { logger } from "../../../lib/logger";
import { config } from "../../../common/config";
import { AmadeusError } from "../../../common/errors/api.error";

export class AmadeusBaseClass {
  private apiKey: string;
  private apiSecret: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = config.api.amadeus.apiKey || "";
    this.apiSecret = config.api.amadeus.apiSecret || "";
    this.baseUrl = config.api.amadeus.baseUrl || "";
  }

  async requestToken() {
    try {
      
    } catch (error) {
      logger.error("Error requesting amadeus access token");
      throw new AmadeusError("Error requesting amadeus access token");
    }
  }

  async fetchToursandActivitiesByLocation(location: string) {
    try {
    } catch (error) {
      logger.error("Error fetching tours and activities by location", error);
      throw new AmadeusError("Error fetching tours and activities by location");
    }
  }
}
