
export class RouteError extends Error {
  statusCode?: number;
  cause?: Record<string, any>;

  constructor(
    message: string,
    statusCode?: number,
    cause?: Record<string, any>,
  ) {
    super(message);
    this.name = "DestinationError";
    this.statusCode = statusCode;
    this.cause = cause;
  }
}
