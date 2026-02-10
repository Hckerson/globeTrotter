"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
exports.verifyAuthHeader = verifyAuthHeader;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = require("../../lib/logger");
const config_1 = require("../../common/config");
const user_repository_1 = require("../../repositories/user.repository");
const code_repository_1 = require("../../repositories/code.repository");
const users = new user_repository_1.UserRepository();
const codes = new code_repository_1.CodeRepository();
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization = "" } = req.headers;
        if (authorization.trim().length === 0 ||
            !authorization.trim().startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // verify token
        const token = authorization.split("Bearer ")[1];
        const { verified, data } = yield verifyAuthHeader(token);
        if (!verified || !data) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { _id, role } = data;
        req.user = { _id, role };
        return next();
    }
    catch (error) {
        logger_1.logger.error("Error in auth middleware", error);
        return res.status(401).json({ message: "Unauthorized" });
    }
});
exports.authMiddleware = authMiddleware;
function verifyAuthHeader(token) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!token)
            return { verified: false, data: null };
        try {
            const payload = jsonwebtoken_1.default.verify(token, config_1.config.auth.jwtSecret || "");
            if (payload) {
                const userId = payload === null || payload === void 0 ? void 0 : payload.userId;
                // find user
                const user = yield users.findUserById(userId);
                if (user) {
                    return { verified: true, data: user };
                }
            }
            return { verified: false, data: null };
        }
        catch (error) {
            logger_1.logger.error("Error verifying auth header", error);
            throw error;
        }
    });
}
