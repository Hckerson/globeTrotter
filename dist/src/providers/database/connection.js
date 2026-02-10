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
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("../../lib/logger");
const { MONGO_USERNAME, MONGO_PASSWORD } = process.env;
const MONGO_CONNECTION_STRING = `mongodb+srv://${MONGO_USERNAME}:${encodeURIComponent(MONGO_PASSWORD !== null && MONGO_PASSWORD !== void 0 ? MONGO_PASSWORD : "")}@globetrotter.0yyk4lm.mongodb.net/globe?retryWrites=true&w=majority&appName=globeTrotter`;
function connectMongoose() {
    return __awaiter(this, void 0, void 0, function* () {
        mongoose_1.default.connection.on("connected", () => logger_1.logger.log("Mongo connected"));
        mongoose_1.default.connection.on("open", () => logger_1.logger.log("Mongo open"));
        mongoose_1.default.connection.on("disconnected", () => logger_1.logger.log("Mongo disconnected"));
        mongoose_1.default.connection.on("reconnected", () => logger_1.logger.log("Mongo reconnected"));
        mongoose_1.default.connection.on("disconnecting", () => logger_1.logger.log("Mongo disconnecting"));
        mongoose_1.default.connection.on("close", () => logger_1.logger.log("Mongo close"));
        yield mongoose_1.default
            .connect(MONGO_CONNECTION_STRING)
            .then(() => logger_1.logger.log("Mongo connection succesfully established"))
            .catch((err) => logger_1.logger.log("Mongo connection error", err));
    });
}
connectMongoose();
exports.default = mongoose_1.default;
