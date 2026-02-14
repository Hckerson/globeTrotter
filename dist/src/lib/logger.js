"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
exports.logger = {
    log: (message, body = "") => {
        if (process.env.NODE_ENV === "development") {
            console.log(message, body);
        }
    },
    error: (message, body = "") => {
        if (process.env.NODE_ENV === "development") {
            console.error(message, body);
        }
    },
};
