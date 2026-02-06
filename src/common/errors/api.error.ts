export class AmadeusError extends Error {
  statusCode?: number;
  cause?: Record<string, any>;

  constructor(
    message: string,
    statusCode?: number,
    cause?: Record<string, any>,
  ) {
    super(message);
    this.cause = cause;
    this.name = "AmadeusError";
    this.statusCode = statusCode;
  }
}

export class OpenWeatherError extends Error {
  statusCode?: number;
  cause?: Record<string, any>;

  constructor(
    message: string,
    statusCode?: number,
    cause?: Record<string, any>,
  ) {
    super(message);
    this.cause = cause;
    this.name = "OpenWeatherError";
    this.statusCode = statusCode;
  }
}
