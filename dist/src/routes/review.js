"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const review_controller_1 = __importDefault(require("../controllers/review/review.controller"));
class ReviewRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post("/review/new", review_controller_1.default.createReview.bind(review_controller_1.default));
        this.router.get("/review/all", review_controller_1.default.fetchAllReviews.bind(review_controller_1.default));
    }
    getRouter() {
        return this.router;
    }
}
exports.default = new ReviewRoutes().getRouter();
