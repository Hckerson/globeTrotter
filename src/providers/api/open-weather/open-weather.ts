import { OpenWeatherError } from "../../../common/errors/api.error";
import { logger } from "../../../lib/logger";
import { AxiosClient } from "../axios-client";
import { openWeatherConfig } from "./config";

const apiClient = new AxiosClient(openWeatherConfig.baseUrl);
const apiKey = openWeatherConfig.apiKey;

export async function getGeoCoordinates(location: string) {
  try {
    const params = new URLSearchParams({
      q: location,
      limit: "5",
      appid: apiKey,
    });
    const response = await apiClient.get("geo/1.0/direct", {
      params,
    });

    const countryData: GeoLookupResponse[] = response.data;

    // filter the ones with the actual name
    const filteredData: OpenWeatherResponseObject[] = countryData
      .filter(
        (country) => country.name.toLowerCase() === location.toLowerCase(),
      )
      .map((country) => {
        // Create a new object without local_names to satisfy the OpenWeatherResponseObject type
        const { local_names, ...rest } = country;
        return rest;
      });

    return filteredData;
  } catch (error) {
    logger.error("Error fetching location coordinates", error);
    throw new OpenWeatherError("Error fetching location coordinates");
  }
}
