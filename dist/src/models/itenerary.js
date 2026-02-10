"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itenerarySchema = exports.Itenerary = void 0;
const connection_1 = __importDefault(require("../providers/database/connection"));
const iteneraryItems_1 = require("./iteneraryItems");
const { Schema, model, Types } = connection_1.default;
const itenerarySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "USER",
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    sharedWith: [Schema.Types.ObjectId],
    createdAt: { type: Date, default: Date.now() },
    iteneraryItems: [iteneraryItems_1.iteneraryItemSchema]
});
exports.itenerarySchema = itenerarySchema;
itenerarySchema.pre("save", function () { });
const Itenerary = model("Itenerary", itenerarySchema);
exports.Itenerary = Itenerary;
