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
exports.UserRepository = void 0;
const user_1 = require("../models/user");
const logger_1 = require("../lib/logger");
class UserRepository {
    constructor() {
        this.users = user_1.User;
    }
    fetchAllUsers(userLookup) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.users.find();
                return response;
            }
            catch (error) {
                logger_1.logger.error("Error fetching all users", error);
                throw error;
            }
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.users.findOne({ email });
                return response;
            }
            catch (error) {
                logger_1.logger.error("Error fetching user by email", error);
                throw error;
            }
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.users.findById(id);
                return response;
            }
            catch (error) {
                logger_1.logger.error("Error fetching user by id", error);
                throw error;
            }
        });
    }
    createNewUser(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.users.create(createUserDto);
                return response;
            }
            catch (error) {
                logger_1.logger.error("Error creating new user", error);
                throw error;
            }
        });
    }
    updateUserById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.users.findOneAndUpdate({ _id: id }, data);
                return response;
            }
            catch (error) {
                logger_1.logger.error("Error updating user by id", error);
                throw error;
            }
        });
    }
}
exports.UserRepository = UserRepository;
