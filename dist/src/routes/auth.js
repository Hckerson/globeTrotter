"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth/auth.controller"));
class AuthRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post("/auth/login", auth_controller_1.default.login.bind(auth_controller_1.default));
        this.router.post("/auth/google/login", auth_controller_1.default.login.bind(auth_controller_1.default));
        this.router.post("/auth/signup", auth_controller_1.default.register.bind(auth_controller_1.default));
        this.router.post("/auth/verify-email", auth_controller_1.default.verifyEmail.bind(auth_controller_1.default));
        this.router.get("/auth/refresh-token", auth_controller_1.default.refreshToken.bind(auth_controller_1.default));
    }
    getRouter() {
        return this.router;
    }
}
exports.default = new AuthRoutes().getRouter();
