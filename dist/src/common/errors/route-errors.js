"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteError = void 0;
class RouteError extends Error {
    constructor(message, statusCode, cause) {
        super(message);
        this.name = "DestinationError";
        this.statusCode = statusCode;
        this.cause = cause;
    }
}
exports.RouteError = RouteError;
