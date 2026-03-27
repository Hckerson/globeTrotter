export class RouteError extends Error {
  statusCode?: number;
  cause?: Record<string, unknown>;

  constructor(
    message: string,
    statusCode?: number,
    cause?: Record<string, unknown>,
  ) {
    super(message);
    this.name = "DestinationError";
    this.statusCode = statusCode;
    this.cause = cause;
  }
}
