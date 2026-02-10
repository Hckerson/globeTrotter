"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.experienceSchema = exports.Experience = void 0;
const connection_1 = __importDefault(require("../providers/database/connection"));
const { Schema, model } = connection_1.default;
const experienceSchema = new Schema({
    destinationId: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, required: true },
    price: {
        min: Number,
        max: Number,
    },
    rating: Number,
});
exports.experienceSchema = experienceSchema;
const Experience = model("Experience", experienceSchema);
exports.Experience = Experience;
