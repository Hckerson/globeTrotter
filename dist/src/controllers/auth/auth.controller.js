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
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = require("./auth.service");
const auth_middleware_1 = require("../../common/middleware/auth-middleware");
class AuthController {
    constructor() {
        this.authService = new auth_service_1.AuthService();
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username = "", email = "" } = req.body;
            if (!username && !email) {
                return res.status(400).json({ message: "Username or email is required" });
            }
            return yield this.authService.login(res, req.body);
        });
    }
    googleLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.json({ message: "Google login successful" });
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const registerUserData = req.body;
            return yield this.authService.register(res, registerUserData);
        });
    }
    verifyEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { code = "", userId = "" } = req.query;
            if (!code || !userId)
                return res
                    .status(400)
                    .json({ message: "Token or userId is missing in request" });
            return yield this.authService.verifyEmail(res, code, userId);
        });
    }
    refreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const header = req.header("authorization");
            if (!header || !header.startsWith("Bearer ")) {
                return res.status(401).json({ message: "Invalid token" });
            }
            const token = header.split("Bearer ")[1];
            const { verified, data } = yield (0, auth_middleware_1.verifyAuthHeader)(token);
            if (!verified) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            return this.authService.refreshToken(res, data);
        });
    }
}
exports.default = new AuthController();
