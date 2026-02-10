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
exports.CodeRepository = void 0;
const verification_code_1 = require("../models/verification-code");
class CodeRepository {
    constructor() {
        this.code = verification_code_1.VerificationCode;
    }
    fetchCodeById(id, type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.code.findOne({
                    userId: id,
                    type,
                });
                return response;
            }
            catch (error) {
                console.error("Error fetching verification code", error);
                throw error;
            }
        });
    }
}
exports.CodeRepository = CodeRepository;
