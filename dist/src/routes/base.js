"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./auth"));
const user_1 = __importDefault(require("./user"));
const review_1 = __importDefault(require("./review"));
const booking_1 = __importDefault(require("./booking"));
const itenerary_1 = __importDefault(require("./itenerary"));
const experiences_1 = __importDefault(require("./experiences"));
const destinations_1 = __importDefault(require("./destinations"));
class BaseRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.use(auth_1.default);
        this.router.use(user_1.default);
        this.router.use(review_1.default);
        this.router.use(booking_1.default);
        this.router.use(itenerary_1.default);
        this.router.use(destinations_1.default);
        this.router.use(experiences_1.default);
    }
    getRouter() {
        return this.router;
    }
}
exports.default = new BaseRoutes().getRouter();
