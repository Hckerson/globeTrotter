import { config } from "../../../common/config";
import { logger } from "../../../lib/logger";

export class AmadeusBaseClass {
  private apiKey: string;
  private apiSecret: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = config.api.amadeus.apiKey || "";
    this.apiSecret = config.api.amadeus.apiSecret || "";
    this.baseUrl = config.api.amadeus.baseUrl || "";
  }

  
  async fetchToursandActivitiesByLocation(){
    try {
      
    } catch (error) {
      logger.error("Error fetching tours and activities by location", error);
    }
  }
}
