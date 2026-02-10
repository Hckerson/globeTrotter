"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IteneraryRoute = void 0;
const express_1 = require("express");
const itenerary_controller_1 = __importDefault(require("../controllers/itenerary/itenerary-controller"));
class IteneraryRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post("/itenerary/create", itenerary_controller_1.default.CreateItenerary.bind(itenerary_controller_1.default));
    }
    getRouter() {
        return this.router;
    }
}
exports.IteneraryRoute = IteneraryRoute;
exports.default = new IteneraryRoute().getRouter();
