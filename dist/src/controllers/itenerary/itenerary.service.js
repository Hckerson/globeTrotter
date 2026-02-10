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
exports.IteneraryService = void 0;
const logger_1 = require("../../lib/logger");
const itenerary_repositroy_1 = require("../../repositories/itenerary.repositroy");
class IteneraryService {
    constructor() {
        this.iteneraryRepository = new itenerary_repositroy_1.IteneraryRepository();
    }
    createItenerary(itenerary) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.iteneraryRepository.createItenerary(itenerary);
                return response;
            }
            catch (error) {
                logger_1.logger.error("Error creating itenerary", error);
                throw error;
            }
        });
    }
}
exports.IteneraryService = IteneraryService;
