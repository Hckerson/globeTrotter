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
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = require("crypto");
const logger_1 = require("../../lib/logger");
const config_1 = require("../../common/config");
const route_errors_1 = require("../../common/errors/route-errors");
const connection_1 = require("../../providers/mails/connection");
const email_1 = require("../../../views/templates/email");
const verification_code_1 = require("../../models/verification-code");
const user_repository_1 = require("../../repositories/user.repository");
const { jwtSecret = "" } = config_1.config.auth;
class AuthService {
    constructor() {
        this.user = new user_repository_1.UserRepository();
        this.code = verification_code_1.VerificationCode;
        this.mailService = new connection_1.Nodemailer();
    }
    register(res, registerDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email = "" } = registerDto;
            try {
                // find existing user
                const existingUser = yield this.user.findUserByEmail(email);
                if (existingUser)
                    return res
                        .json({
                        message: "User already exists",
                        data: existingUser,
                    })
                        .status(409);
                // create new user
                const user = yield this.user.createNewUser(registerDto);
                if (user) {
                    // create verification code
                    const verificationCode = yield this.code.create({
                        type: "email-verification",
                        userId: user._id,
                        code: (0, crypto_1.randomBytes)(32).toString("hex"),
                        expiresAt: new Date(Date.now() + 3600000),
                    });
                    const email = user.email;
                    const verificationLink = `${config_1.config.app.frontendUrl}/verify-email?code=${verificationCode.code}&userId=${user._id}`;
                    const template = email_1.EmailTemplates.verifyEmail({
                        verificationLink,
                    });
                    const emailResponse = yield this.mailService.sendEmail({
                        to: email,
                        subject: "Verify your email address",
                        html: template.html,
                    });
                    logger_1.logger.log("Email sent", emailResponse);
                    return res
                        .json({
                        message: "User registered successfully",
                        data: user,
                    })
                        .status(201);
                }
            }
            catch (error) {
                logger_1.logger.error("Error registering user");
                throw new route_errors_1.AuthError("Error registering user");
            }
        });
    }
    login(res, loginDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email = "", password = "" } = loginDto;
                // check for user existence
                const existingUser = yield this.user.findUserByEmail(email);
                if (!existingUser) {
                    return res.json({ message: "User not found" }).status(404);
                }
                // check user verification status
                if (!existingUser.emailVerified) {
                    try {
                        const verificationCode = yield this.code.create({
                            type: "email-verification",
                            userId: existingUser._id,
                            code: (0, crypto_1.randomBytes)(32).toString("hex"),
                            expiresAt: new Date(Date.now() + 3600000),
                        });
                        const email = existingUser.email;
                        const verificationLink = `${config_1.config.app.frontendUrl}/verify-email?code=${verificationCode.code}&userId=${existingUser._id}`;
                        const template = email_1.EmailTemplates.verifyEmail({
                            verificationLink,
                        });
                        const emailResponse = yield this.mailService.sendEmail({
                            to: email,
                            subject: "Verify your email address",
                            html: template.html,
                        });
                        logger_1.logger.log("Email sent", emailResponse);
                        return res.status(401).json({ message: "User not verified" });
                    }
                    catch (error) {
                        logger_1.logger.error("Error verifying user");
                        throw new route_errors_1.AuthError("Error verifying user");
                    }
                }
                // confirm password
                const isPasswordValid = yield bcryptjs_1.default.compare(password, existingUser.password);
                if (!isPasswordValid) {
                    return res.status(401).json({ message: "Invalid password" });
                }
                const accessToken = jsonwebtoken_1.default.sign({
                    userId: existingUser._id,
                    role: existingUser.role,
                }, jwtSecret, { expiresIn: "1h", issuer: config_1.config.app.appName });
                const refreshToken = jsonwebtoken_1.default.sign({
                    userId: existingUser._id,
                    role: existingUser.role,
                }, jwtSecret, { expiresIn: "1d", issuer: config_1.config.app.appName });
                yield this.code.create({
                    type: "refresh-token",
                    userId: existingUser._id,
                    code: refreshToken,
                    expiresAt: new Date(Date.now() + 86400000),
                });
                return res.status(200).json({
                    message: "Login successful",
                    data: {
                        accessToken,
                        refreshToken,
                    },
                });
            }
            catch (error) {
                logger_1.logger.error("Error logging in user");
                throw new route_errors_1.AuthError("Error logging in user");
            }
        });
    }
    verifyEmail(res, token, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // fetch verificationCode
                const codeData = yield this.code.findOne({
                    userId,
                    code: token,
                    type: "email-verification",
                });
                if (!codeData)
                    return res.status(401).json({ message: "Invalid verification code" });
                const code = codeData.code;
                const expiresAt = codeData.expiresAt;
                // verify code
                if (new Date(expiresAt) < new Date()) {
                    return res.status(401).json({ message: "Verification code expired" });
                }
                if (code !== token) {
                    return res.status(401).json({ message: "Invalid verification code" });
                }
                // update user status
                yield this.user.updateUserById(userId, { emailVerified: true });
                return res.status(200).json({ message: "Email verified successfully" });
            }
            catch (error) {
                logger_1.logger.error("Error verifying email", error);
                throw new route_errors_1.AuthError("Error verifying email");
            }
        });
    }
    refreshToken(res, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accessToken = jsonwebtoken_1.default.sign({
                    userId: data._id,
                    role: data.role,
                }, jwtSecret, { expiresIn: "1h", issuer: config_1.config.app.appName });
                const refreshToken = jsonwebtoken_1.default.sign({
                    userId: data._id,
                    role: data.role,
                }, jwtSecret, { expiresIn: "1d", issuer: config_1.config.app.appName });
                yield this.code.updateOne({ _id: data._id }, {
                    code: refreshToken,
                    expiresAt: new Date(Date.now() + 86400000),
                });
                return res.status(200).json({
                    message: "Token refreshed successfully",
                    data: {
                        accessToken,
                        refreshToken,
                    },
                });
            }
            catch (error) {
                console.error("Error refreshing token", error);
                throw new route_errors_1.AuthError("Error refreshing token");
            }
        });
    }
}
exports.AuthService = AuthService;
