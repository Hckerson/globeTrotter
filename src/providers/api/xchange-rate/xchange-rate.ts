import axios from "axios";
import { logger } from "../../../lib/logger";
import { AxiosClient } from "../axios-client";
import { XchangeRateError } from "../../../common/errors/api.error";


const api = new AxiosClient()
export default function exchangeCurrency(
  amount: number,
  from: string,
  to: string,
) {
  try {

    
  } catch (error) {
    logger.error("Error exchanging currency", error);
    if (error && axios.isAxiosError(error)) {
      throw new XchangeRateError(
        "Error exchanging currency",
        error.response?.status,
        error,
      );
    }
  }
}
