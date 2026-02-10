"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleWare = void 0;
const api_error_1 = require("../errors/api.error");
const errorMiddleWare = (err, req, res, next) => {
    if (!err) {
        return next();
    }
    if (err instanceof api_error_1.AmadeusError || err instanceof api_error_1.OpenWeatherError) {
        const statusCode = err.statusCode || 500;
        const message = err.message || "Internal server error";
        const cause = err.cause || {};
        const name = err.name || "API Error";
        return res.status(statusCode).json({ message, cause, name });
    }
    return res.status(500).json({ message: "Internal server error" });
};
exports.errorMiddleWare = errorMiddleWare;
