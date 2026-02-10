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
const user_service_1 = require("./user.service");
class UserController {
    constructor() {
        this.userService = new user_service_1.UserService();
    }
    getProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.query["userId"];
            const user = yield this.userService.getProfile(userId);
        });
    }
    getAllUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit = "10", page = "1", search = "" } = req.query;
            const users = yield this.userService.getAllUser(limit, page, search);
            return res.status(200).json({
                message: "Users fetched successfully",
                users,
            });
        });
    }
}
exports.default = new UserController();
