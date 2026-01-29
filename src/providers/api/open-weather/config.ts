import 'dotenv/config'

export const openWeatherConfig = {
  baseUrl: process.env.OPENWEATHER_BASE_URL || "",
  apiKey: process.env.OPENWEATHER_API_KEY || "",
}