import { amadeusConfig } from "./config";
import { logger } from "../../../lib/logger";
import { AxiosClient } from "../axios-client";
import { config } from "../../../common/config";
import { AmadeusError } from "../../../common/errors/api.error";
import { AmadeusOAuth2Token } from "../../../common/interface/externals/amadeus";
import { getGeoCoordinates } from "../open-weather/open-weather";

export class AmadeusBaseClass {
  private apiKey: string;
  private baseUrl: string;
  private apiSecret: string;
  private axiosClient: AxiosClient;

  constructor() {
    this.apiKey = config.api.amadeus.apiKey || "";
    this.apiSecret = config.api.amadeus.apiSecret || "";
    this.baseUrl = config.api.amadeus.baseUrl || "";
    this.axiosClient = new AxiosClient(this.baseUrl);
  }

  async requestToken(): Promise<AmadeusOAuth2Token | null> {
    try {
      const response = await this.axiosClient.get<AmadeusOAuth2Token>(
        amadeusConfig.requestToken,
        {
          params: {
            grant_type: "client_credentials",
            client_id: this.apiKey,
            client_secret: this.apiSecret,
          },
        },
      );
      return response.data;
    } catch (error) {
      logger.error("Error requesting amadeus access token");
      throw new AmadeusError("Error requesting amadeus access token");
    }
  }

  async fetchLocationData(location: string) {
    // fetch possible location data
    const geoLocations = await getGeoCoordinates(location);

    try {
      // construct the bulk request payload

      const bulkRequest = geoLocations.map((location) => {
        return this.axiosClient.get("/shopping/activities", {
          params: {
            latitude: location.lat,
            longitude: location.lon,
          },
          headers: {
            Authorization: `Bearer ${config.api.amadeus.apiKey}`,
          },
        });
      });
      console.log(bulkRequest);
      // const responses = await Promise.all(bulkRequest);

      // return responses.map((response) => response.data);
    } catch (error) {
      logger.error("Error fetching tours and activities by location", error);
      throw new AmadeusError("Error fetching tours and activities by location");
    }
  }
}
