import { logger } from "../../lib/logger";
import { AmadeusBaseClass } from "../../providers/api/amadeus/amadeus";


export class DestinationService {
  private amadeusService: AmadeusBaseClass;
  constructor (){
    this.amadeusService = new AmadeusBaseClass();
  }

  async fetchLocationData(city: string) { 
    try {
      
    } catch (error) {
      logger.error("Error fetching location attributes", error)
      throw error
    }
  }
}