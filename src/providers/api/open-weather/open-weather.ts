import { apiConfig } from "../config";
import { logger } from "../../../lib/logger";
import { AxiosClient } from "../axios-client";
import { appConfig } from "../../../common/config";
import { OpenWeatherError } from "../../../common/errors/api.error";

const apiClient = new AxiosClient(appConfig.api.openWeather.baseUrl || "");
const apiKey = appConfig.api.openWeather.apiKey || "";

export async function getGeoCoordinates(location: string) {
  try {
    const params = new URLSearchParams({
      q: location,
      limit: "5",
      appid: apiKey,
    });
    const response = await apiClient.get(apiConfig.openWeather.coordinates, {
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
