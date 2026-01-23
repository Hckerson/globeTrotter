import { AuthService } from "./auth/auth.service";
import { Nodemailer } from "../providers/mails/connection";

export const services = {
  authService: new AuthService(),
  mailService: new Nodemailer()
}