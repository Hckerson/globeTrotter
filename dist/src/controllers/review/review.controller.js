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
const review_service_1 = require("./review.service");
class ReviewController {
    constructor() {
        this.reviewService = new review_service_1.ReviewService();
    }
    createReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const review = req.body;
            if (!review) {
                return res.status(400).json({
                    message: "Review is required",
                });
            }
            return this.reviewService.createReview(res, review);
        });
    }
    fetchAllReviews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
            if (!userId) {
                return res.status(400).json({
                    message: "User not found",
                });
            }
            return this.reviewService.fetchAllReview(res, userId);
        });
    }
}
exports.default = new ReviewController();
