export class AmadeusError extends Error {
  statusCode?: number;
  cause?: Record<string, unknown>;

  constructor(
    message: string,
    statusCode?: number,
    cause?: Record<string, unknown>,
  ) {
    super(message);
    this.cause = cause;
    this.name = "AmadeusError";
    this.statusCode = statusCode;
  }
}

export class OpenWeatherError extends Error {
  statusCode?: number;
  cause?: Record<string, unknown>;

  constructor(
    message: string,
    statusCode?: number,
    cause?: Record<string, unknown>,
  ) {
    super(message);
    this.cause = cause;
    this.name = "OpenWeatherError";
    this.statusCode = statusCode;
  }
}

export class XchangeRateError extends Error {
  statusCode?: number;
  cause?: Record<string, unknown>;

  constructor(
    message: string,
    statusCode?: number,
    cause?: Record<string, unknown>,
  ) {
    super(message);
    this.cause = cause;
    this.name = "XchangeRateError";
    this.statusCode = statusCode;
  }
}
