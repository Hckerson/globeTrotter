"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingSchema = exports.Booking = void 0;
const connection_1 = __importDefault(require("../providers/database/connection"));
const { Schema, model } = connection_1.default;
const bookingSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    iteneraryId: { type: Schema.Types.ObjectId, ref: "Itenerary" },
    status: { type: String, enum: ["PENDING", "CONFIRMED", "CANCELLED"] },
    createdAt: { type: Date, default: Date.now() },
});
exports.bookingSchema = bookingSchema;
const Booking = model("Booking", bookingSchema);
exports.Booking = Booking;
