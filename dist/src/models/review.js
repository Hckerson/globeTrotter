"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewSchema = exports.Review = void 0;
const { Schema, Types } = connection_1.default;
const connection_1 = __importDefault(require("../providers/database/connection"));
const reviewSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    destinationId: { type: Schema.Types.ObjectId, ref: "Destination", required: true },
    rating: { type: Number, min: 1, max: 5 },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
});
exports.reviewSchema = reviewSchema;
const Review = connection_1.default.model("Review", reviewSchema);
exports.Review = Review;
