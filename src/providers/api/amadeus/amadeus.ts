import qs from "qs";
import { amadeusConfig } from "./config";
import axios from "axios";
import { logger } from "../../../lib/logger";
import { AxiosClient } from "../axios-client";
import { config } from "../../../common/config";
import { AmadeusError } from "../../../common/errors/api.error";
import { getGeoCoordinates } from "../open-weather/open-weather";
import { AmadeusOAuth2Token } from "../../../common/interface/api/amadeus";

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

    if (!this.apiKey || !this.apiSecret || !this.baseUrl) {
      throw new Error("Amadeus API key, secret, or base URL not found");
    }
  }

  async requestToken(): Promise<AmadeusOAuth2Token | null> {
    try {
      const response = await this.axiosClient.post<AmadeusOAuth2Token>(
        amadeusConfig.requestToken,
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

  async fetchLocationData(location: string): Promise<any[]> {
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
            Authorization: `Bearer ${config.api.amadeus.accessToken}`,
          },
        });
      });
      const responses = await Promise.all(bulkRequest);

      return responses.map((response) => response.data);
    } catch (error) {
      logger.error("Error fetching tours and activities by location", error);
      // check if error is axios error
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401 || (error as any).cause === 401) {
          logger.log("Amadeus token expired, refreshing...");
          const token = await this.requestToken();
          if (token) {
            config.api.amadeus.accessToken = token.access_token;
            return this.fetchLocationData(location);
          }
        }
      }
      throw new AmadeusError(
        "Error fetching tours and activities by location",
        axios.isAxiosError(error) ? error.response?.status : 500,
      );
    }
  }
}
