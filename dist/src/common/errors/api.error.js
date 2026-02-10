"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenWeatherError = exports.AmadeusError = void 0;
class AmadeusError extends Error {
    constructor(message, statusCode, cause) {
        super(message);
        this.cause = cause;
        this.name = "AmadeusError";
        this.statusCode = statusCode;
    }
}
exports.AmadeusError = AmadeusError;
class OpenWeatherError extends Error {
    constructor(message, statusCode, cause) {
        super(message);
        this.cause = cause;
        this.name = "OpenWeatherError";
        this.statusCode = statusCode;
    }
}
exports.OpenWeatherError = OpenWeatherError;
