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
exports.getGeoCoordinates = getGeoCoordinates;
const logger_1 = require("../../../lib/logger");
const config_1 = require("../../../common/config");
const axios_client_1 = require("../axios-client");
const api_error_1 = require("../../../common/errors/api.error");
const apiClient = new axios_client_1.AxiosClient(config_1.config.api.openWeather.baseUrl);
const apiKey = config_1.config.api.openWeather.apiKey;
function getGeoCoordinates(location) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const params = new URLSearchParams({
                q: location,
                limit: "5",
                appid: apiKey,
            });
            const response = yield apiClient.get("/geo/1.0/direct", {
                params,
            });
            const countryData = response.data;
            // filter the ones with the actual name
            const filteredData = countryData
                .filter((country) => country.name.toLowerCase() === location.toLowerCase())
                .map((country) => {
                // Create a new object without local_names to satisfy the OpenWeatherResponseObject type
                const { local_names } = country, rest = __rest(country, ["local_names"]);
                return rest;
            });
            return filteredData;
        }
        catch (error) {
            logger_1.logger.error("Error fetching location coordinates", error);
            throw new api_error_1.OpenWeatherError("Error fetching location coordinates");
        }
    });
}
