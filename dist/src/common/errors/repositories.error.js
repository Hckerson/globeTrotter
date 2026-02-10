"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepoError = void 0;
class UserRepoError extends Error {
    constructor(message, statusCode, cause) {
        super(message);
        this.name = "UserRepoError";
        this.statusCode = statusCode;
        this.cause = cause;
    }
}
exports.UserRepoError = UserRepoError;
