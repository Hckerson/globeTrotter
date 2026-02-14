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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IteneraryService = void 0;
const logger_1 = require("../../lib/logger");
const itenerary_repositroy_1 = require("../../repositories/itenerary.repositroy");
const mongoose_1 = require("mongoose");
class IteneraryService {
    constructor() {
        this.iteneraryRepository = new itenerary_repositroy_1.IteneraryRepository();
    }
    createItenerary(itenerary) {
        return __awaiter(this, void 0, void 0, function* () {
            const { iteneraryItems } = itenerary, rest = __rest(itenerary, ["iteneraryItems"]);
            try {
                const payload = Object.assign(Object.assign({}, rest), { iteneraryItems: iteneraryItems === null || iteneraryItems === void 0 ? void 0 : iteneraryItems.map((item) => {
                        return Object.assign(Object.assign({}, item), { _id: new mongoose_1.Types.ObjectId() });
                    }) });
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
