"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.destinationSchema = exports.Destination = void 0;
const connection_1 = __importDefault(require("../providers/database/connection"));
const { Schema, model } = connection_1.default;
const destinationSchema = new Schema({
    name: { type: String },
    location: {
        address: String,
        coordinates: String,
        country: String,
        state: String,
    },
    type: {
        type: String,
        enum: ["city", "country", "natural"],
    },
    description: String,
    images: [String],
    avgCost: { type: Number },
    createdAt: { type: Date, default: Date.now() },
});
exports.destinationSchema = destinationSchema;
const Destination = model("Destination", destinationSchema);
exports.Destination = Destination;
