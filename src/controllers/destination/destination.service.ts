import { Response } from "express";
import { logger } from "../../lib/logger";
import { AmadeusBaseClass } from "../../providers/api/amadeus/amadeus";
import { DestinationFilter } from "../../common/interface/models";

export class DestinationService {
  private amadeusService: AmadeusBaseClass;
  constructor() {
    this.amadeusService = new AmadeusBaseClass();
  }

  async fetchLocationData(
    res: Response,
    city: string,
    filter?: DestinationFilter,
  ) {
    try {
      const locationData = await this.amadeusService.fetchLocationData(city);
      let actualData = locationData?.flatMap((location) => location.data.data);
      if (actualData) {
        if (filter) {
          const {
            "min-price": minPrice,
            "max-price": maxPrice,
            "max-distance": maxDistance,
            "min-rating": minRating,
            "max-rating": maxRating,
            type,
          } = filter;


          const filteredLocations = actualData.filter((location) => {
            
            const meetMaxRatingRequirement = maxRating ? location.rating <= maxRating : true;
            const meetMinRatingRequirement = minRating ? location.rating >= minRating : true;
            const meetMaxDistanceRequirement = maxDistance ? location.distance <= maxDistance : true;
            
            if (minPrice || maxPrice) {
              const price = location.price.amount;
              if (minPrice && maxPrice) {
                return price >= minPrice && price <= maxPrice;
              } else if (minPrice) {
                return price >= minPrice;
              } else {
                return price <= maxPrice!;
              }
            }
          });
        }
        return res
          .status(200)
          .json({ message: "Location fetch successful", data: actualData });
      }
      return res.status(400).json({ message: "Location not found" });
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
