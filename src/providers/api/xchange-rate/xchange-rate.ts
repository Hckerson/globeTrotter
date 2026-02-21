import axios from "axios";
import { apiConfig } from "../config";
import { logger } from "../../../lib/logger";
import { AxiosClient } from "../axios-client";
import { appConfig } from "../../../common/config";
import { XchangeRateError } from "../../../common/errors/api.error";

import { ExchangeRateResponse } from "../../../common/interface/api/xchange-rate";

const BASE_URL = appConfig.api.xchangeRate.baseUrl || "";
const API_KEY = appConfig.api.xchangeRate.apiKey || "";
const ENDPOINT = apiConfig.xchangeRate.latest || "";
const client = new AxiosClient(BASE_URL);

export default async function exchangeCurrency(
  from: string = 'USD',
) {
  try {
    const response = await client.get<ExchangeRateResponse>(
      `${ENDPOINT}/${from}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      },
    );

    if (!response.data) {
      throw new XchangeRateError("No data received from Exchange Rate API");
    }

    const { conversion_rates } = response.data;
    return conversion_rates;
  } catch (error) {
    logger.error("Error exchanging currency", error);
    
    if (axios.isAxiosError(error)) {
      throw new XchangeRateError(
        "Error exchanging currency",
        error.response?.status,
        error,
      );
    }
    throw error;
  }
}
