export class AmadeusError extends Error {
  statusCode?: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = "AmadeusError";
    this.statusCode = statusCode;
  }
}

export class OpenWeatherError extends Error {
  statusCode?: number;
  
  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = "OpenWeatherError";
    this.statusCode = statusCode;
  }
}
