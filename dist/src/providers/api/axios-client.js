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
exports.AxiosClient = void 0;
const axios_1 = __importDefault(require("axios"));
class AxiosClient {
    constructor(baseUrl) {
        if (!baseUrl) {
            throw new Error("AxiosClient requires a baseUrl");
        }
        this.baseUrl = baseUrl;
        this.axiosInstance = this.createAxiosInstance();
    }
    createAxiosInstance() {
        const baseAxiosConfig = {
            baseURL: this.baseUrl,
            headers: {
                "Content-Type": "application/json",
            },
        };
        return axios_1.default.create(baseAxiosConfig);
    }
    request(url, config, body) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const configObject = {
                method: config.method,
                params: config === null || config === void 0 ? void 0 : config.params,
                timeout: config === null || config === void 0 ? void 0 : config.timeout,
                headers: config === null || config === void 0 ? void 0 : config.headers,
                data: body,
            };
            const headerBody = {};
            try {
                if (body instanceof FormData) {
                    headerBody["Content-Type"] = "multipart/form-data";
                }
                const response = yield this.axiosInstance.request(Object.assign(Object.assign({ url }, configObject), { headers: Object.assign(Object.assign({}, configObject.headers), headerBody) }));
                // create api response
                const apiResponse = {
                    data: response.data,
                    status: response === null || response === void 0 ? void 0 : response.status,
                    message: (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.message,
                    error: (_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b.error,
                };
                return apiResponse;
            }
            catch (error) {
                console.error("Error making api request", error);
                throw error;
            }
        });
    }
    get(url, config) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.request(url, Object.assign(Object.assign({}, config), { method: "GET" }));
            }
            catch (error) {
                console.error("Error making  GET api request", error);
                throw error;
            }
        });
    }
    post(url, config, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.request(url, Object.assign(Object.assign({}, config), { method: "POST" }), body);
            }
            catch (error) {
                console.error("Error making  POST api request", error);
                throw error;
            }
        });
    }
    patch(url, config, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.request(url, Object.assign(Object.assign({}, config), { method: "PATCH" }), body);
            }
            catch (error) {
                console.error("Error making  PATCH api request", error);
                throw error;
            }
        });
    }
    put(url, config, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.request(url, Object.assign(Object.assign({}, config), { method: "PUT" }), body);
            }
            catch (error) {
                console.error("Error making  PUT api request", error);
                throw error;
            }
        });
    }
    delete(url, config, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.request(url, Object.assign(Object.assign({}, config), { method: "DELETE" }), body);
            }
            catch (error) {
                console.error("Error making  DELETE api request", error);
                throw error;
            }
        });
    }
}
exports.AxiosClient = AxiosClient;
