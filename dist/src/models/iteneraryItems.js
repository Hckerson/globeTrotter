"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.iteneraryItemSchema = exports.IteneraryItem = void 0;
const connection_1 = __importDefault(require("../providers/database/connection"));
const { Schema, model } = connection_1.default;
const iteneraryItemSchema = new Schema({
    iteneraryId: { type: Schema.Types.ObjectId, ref: "Itenerary" },
    dayNumber: { type: Number, required: true },
    experienceId: { type: Schema.Types.ObjectId, required: true, ref: "Experience" },
    notes: String,
    createdAt: { type: Date, default: Date.now() },
});
exports.iteneraryItemSchema = iteneraryItemSchema;
const IteneraryItem = model("IteneraryItem", iteneraryItemSchema);
exports.IteneraryItem = IteneraryItem;
