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
exports.ReviewService = void 0;
const review_repository_1 = require("../../repositories/review.repository");
const logger_1 = require("../../lib/logger");
class ReviewService {
    constructor() {
        this.review = new review_repository_1.ReviewRepository();
    }
    createReview(res, review) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reviewData = yield this.review.createReview(review);
                return res.status(201).json({
                    message: "Review created successfully",
                    reviewData,
                });
            }
            catch (error) {
                logger_1.logger.error("Error creating review", error);
                throw error;
            }
        });
    }
    fetchAllReview(res, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reviewData = yield this.review.fetchAllReview(userId);
                return res.status(200).json({
                    message: "Review fetched successfully",
                    reviewData,
                });
            }
            catch (error) {
                logger_1.logger.error("Error fetching review", error);
                throw error;
            }
        });
    }
}
exports.ReviewService = ReviewService;
