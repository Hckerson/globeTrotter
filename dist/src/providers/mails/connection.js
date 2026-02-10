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
exports.Nodemailer = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sender = process.env.APP_EMAIL;
class Nodemailer {
    constructor() {
        this.transporter = this.initializeTransporter();
    }
    initializeTransporter() {
        return nodemailer_1.default.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // Use true for port 465, false for port 587
            auth: {
                user: "consuelo.hagenes@ethereal.email",
                pass: "G5dFkRS5UD7EJEPj2U",
            },
        });
    }
    previewMessage(info) {
        return nodemailer_1.default.getTestMessageUrl(info);
    }
    sendEmail(mailOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const info = yield this.transporter.sendMail(Object.assign({ from: sender }, mailOptions));
                return this.previewMessage(info);
            }
            catch (error) {
                console.error('Error sending email', error);
                throw error;
            }
        });
    }
}
exports.Nodemailer = Nodemailer;
