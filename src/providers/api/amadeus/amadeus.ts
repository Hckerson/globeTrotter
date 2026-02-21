import qs from "qs";
import axios from "axios";
import { apiConfig } from "../config";
import { logger } from "../../../lib/logger";
import { AxiosClient } from "../axios-client";
import { appConfig } from "../../../common/config";
import { AmadeusError } from "../../../common/errors/api.error";
import { getGeoCoordinates } from "../open-weather/open-weather";
import {
  AmadeusActivityResponse,
  AmadeusOAuth2Token,
} from "../../../common/interface/api/amadeus";

export class AmadeusBaseClass {
  private apiKey: string;
  private baseUrl: string;
  private apiSecret: string;
  private axiosClient: AxiosClient;

  constructor() {
    this.apiKey = appConfig.api.amadeus.apiKey || "";
    this.apiSecret = appConfig.api.amadeus.apiSecret || "";
    this.baseUrl = appConfig.api.amadeus.baseUrl || "";
    this.axiosClient = new AxiosClient(this.baseUrl);

    if (!this.apiKey || !this.apiSecret || !this.baseUrl) {
      throw new Error("Amadeus API key, secret, or base URL not found");
    }
  }

  async requestToken(): Promise<AmadeusOAuth2Token | null> {
    try {
      const response = await this.axiosClient.post<AmadeusOAuth2Token>(
        apiConfig.amadeus.requestToken,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
        qs.stringify({
          grant_type: "client_credentials",
          client_id: this.apiKey,
          client_secret: this.apiSecret,
        }),
      );
      return response.data;
    } catch (error) {
      logger.error("Error requesting amadeus access token");
      throw new AmadeusError("Error requesting amadeus access token");
    }
  }

  async fetchLocationData(
    location: string,
  ): Promise<AmadeusActivityResponse[] | null> {
    // fetch possible location data
    const geoLocations = await getGeoCoordinates(location);

    try {
      // construct the bulk request payload
      const bulkRequest = geoLocations.map((location) => {
        return this.axiosClient.get(apiConfig.amadeus.fetchLocationData, {
          params: {
            latitude: location.lat,
            longitude: location.lon,
          },
          headers: {
            Authorization: `Bearer ${appConfig.api.amadeus.accessToken}`,
          },
        });
      });
      const responses = await Promise.all(bulkRequest);

      return responses.map((response) => response.data);
    } catch (error) {
      logger.error("Error fetching tours and activities by location", error);
      throw new AmadeusError(
        "Error fetching tours and activities by location",
        axios.isAxiosError(error) ? error.response?.status : 500,
      );
    }
  }
}
