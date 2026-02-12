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
exports.IteneraryController = void 0;
const logger_1 = require("../../lib/logger");
const itenerary_service_1 = require("./itenerary.service");
class IteneraryController {
    constructor() {
        this.iteneraryService = new itenerary_service_1.IteneraryService();
    }
    /**
     *
     * @param req -Request object to extract the new iteneray information
     * @param res
     */
    CreateItenerary(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const itenerary = req.body;
            const { iteneraryItems } = itenerary;
            logger_1.logger.log("Creating itenerary with object", req.body);
            if (!iteneraryItems || iteneraryItems.length < 1) {
                return res.status(400).json({
                    error: "Invalid payload",
                    message: "iteneraryitems must contain at least one thing",
                });
            }
        });
    }
}
exports.IteneraryController = IteneraryController;
exports.default = new IteneraryController();
