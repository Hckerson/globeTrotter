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
exports.DestinationService = void 0;
const logger_1 = require("../../lib/logger");
const amadeus_1 = require("../../providers/api/amadeus/amadeus");
class DestinationService {
    constructor() {
        this.amadeusService = new amadeus_1.AmadeusBaseClass();
    }
    fetchLocationData(res, city) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const locationData = yield this.amadeusService.fetchLocationData(city);
                return res
                    .status(200)
                    .json({ message: "Location fetch successful", data: locationData });
            }
            catch (error) {
                logger_1.logger.error("Error fetching location attributes", error);
                throw error;
            }
        });
    }
    refreshToken(res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield this.amadeusService.requestToken();
                return res
                    .status(200)
                    .json({ message: "Token refresh successful", data: token });
            }
            catch (error) {
                logger_1.logger.error("Error refreshing token", error);
                throw error;
            }
        });
    }
}
exports.DestinationService = DestinationService;
