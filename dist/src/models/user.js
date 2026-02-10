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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.User = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const review_1 = require("./review");
const connection_1 = __importDefault(require("../providers/database/connection"));
const { Schema } = connection_1.default;
const SALT_HASH = 10;
const userSchema = new Schema({
    username: { type: String, required: true, lowercase: true },
    createdAt: { type: Date, default: Date.now() },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        lowercase: true,
        trim: true,
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    role: { type: String, enum: ["admin", "user", "partner"], required: true },
    password: { type: String, required: true, minLength: 4, maxLength: 12 },
    reviews: [review_1.reviewSchema],
}, {
    virtuals: {
        fullName: {
            get() {
                return this.firstName + "" + this.lastName;
            },
        },
    },
});
exports.userSchema = userSchema;
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password")) {
            return next();
        }
        this.password = yield bcryptjs_1.default.hash(this.password, SALT_HASH);
        next();
    });
});
userSchema.pre("findOneAndUpdate", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const update = this.getUpdate();
        if (update && update.password) {
            update.password = bcryptjs_1.default.hash(update.password, SALT_HASH);
        }
        next();
    });
});
const User = connection_1.default.model("User", userSchema);
exports.User = User;
const a = new User();
a.fullName;
