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
exports.AmadeusBaseClass = void 0;
const qs_1 = __importDefault(require("qs"));
const config_1 = require("./config");
const axios_1 = __importDefault(require("axios"));
const logger_1 = require("../../../lib/logger");
const axios_client_1 = require("../axios-client");
const config_2 = require("../../../common/config");
const api_error_1 = require("../../../common/errors/api.error");
const open_weather_1 = require("../open-weather/open-weather");
class AmadeusBaseClass {
    constructor() {
        this.apiKey = config_2.config.api.amadeus.apiKey || "";
        this.apiSecret = config_2.config.api.amadeus.apiSecret || "";
        this.baseUrl = config_2.config.api.amadeus.baseUrl || "";
        this.axiosClient = new axios_client_1.AxiosClient(this.baseUrl);
        if (!this.apiKey || !this.apiSecret || !this.baseUrl) {
            throw new Error("Amadeus API key, secret, or base URL not found");
        }
    }
    requestToken() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.axiosClient.post(config_1.amadeusConfig.requestToken, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }, qs_1.default.stringify({
                    grant_type: "client_credentials",
                    client_id: this.apiKey,
                    client_secret: this.apiSecret,
                }));
                return response.data;
            }
            catch (error) {
                logger_1.logger.error("Error requesting amadeus access token");
                throw new api_error_1.AmadeusError("Error requesting amadeus access token");
            }
        });
    }
    fetchLocationData(location) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            // fetch possible location data
            const geoLocations = yield (0, open_weather_1.getGeoCoordinates)(location);
            try {
                // construct the bulk request payload
                const bulkRequest = geoLocations.map((location) => {
                    return this.axiosClient.get("/shopping/activities", {
                        params: {
                            latitude: location.lat,
                            longitude: location.lon,
                        },
                        headers: {
                            Authorization: `Bearer ${config_2.config.api.amadeus.accessToken}`,
                        },
                    });
                });
                const responses = yield Promise.all(bulkRequest);
                return responses.map((response) => response.data);
            }
            catch (error) {
                logger_1.logger.error("Error fetching tours and activities by location", error);
                // check if error is axios error
                if (axios_1.default.isAxiosError(error)) {
                    if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 401 || error.cause === 401) {
                        logger_1.logger.log("Amadeus token expired, refreshing...");
                        const token = yield this.requestToken();
                        if (token) {
                            config_2.config.api.amadeus.accessToken = token.access_token;
                            return this.fetchLocationData(location);
                        }
                    }
                }
                throw new api_error_1.AmadeusError("Error fetching tours and activities by location", axios_1.default.isAxiosError(error) ? (_b = error.response) === null || _b === void 0 ? void 0 : _b.status : 500);
            }
        });
    }
}
exports.AmadeusBaseClass = AmadeusBaseClass;
