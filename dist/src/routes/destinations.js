"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const destination_controller_1 = __importDefault(require("../controllers/destination/destination.controller"));
class DestinationRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get("/destination/search", destination_controller_1.default.fetchLocationData.bind(destination_controller_1.default));
        this.router.get("/destination/refresh", destination_controller_1.default.refreshToken.bind(destination_controller_1.default));
    }
    getRouter() {
        return this.router;
    }
}
exports.default = new DestinationRoutes().getRouter();
