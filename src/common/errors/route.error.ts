export class DestinationError extends Error {
  statusCode?: number;
  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = "DestinationError";
    this.statusCode = statusCode;
  }
}
