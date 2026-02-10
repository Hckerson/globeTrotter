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
exports.ReviewRepository = void 0;
const logger_1 = require("../lib/logger");
const review_1 = require("../models/review");
class ReviewRepository {
    constructor() {
        this.review = review_1.Review;
    }
    createReview(review) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.review.create(review);
                return response;
            }
            catch (error) {
                logger_1.logger.error("Error creating review", error);
                throw error;
            }
        });
    }
    fetchAllReview(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.review.find({ userId: userId });
                return response;
            }
            catch (error) {
                logger_1.logger.error("Error fetching reviews", error);
                throw error;
            }
        });
    }
}
exports.ReviewRepository = ReviewRepository;
