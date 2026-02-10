"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user/user-controller"));
class UserRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get("/users/profile", user_controller_1.default.getProfile.bind(user_controller_1.default));
        this.router.post("/users", user_controller_1.default.getAllUser.bind(user_controller_1.default));
        this.router.post("/users/review", user_controller_1.default.getAllUser.bind(user_controller_1.default));
    }
    getRouter() {
        return this.router;
    }
}
exports.default = new UserRoutes().getRouter();
