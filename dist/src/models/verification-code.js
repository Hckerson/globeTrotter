"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificationCodeSchema = exports.VerificationCode = void 0;
const connection_1 = __importDefault(require("../providers/database/connection"));
const { Schema, model } = connection_1.default;
const verificationCodeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    code: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
    type: {
        type: String,
        enum: ["email-verification", "password-reset", "refresh-token"],
        required: true,
    },
});
exports.verificationCodeSchema = verificationCodeSchema;
const VerificationCode = model("VerificationCode", verificationCodeSchema);
exports.VerificationCode = VerificationCode;
