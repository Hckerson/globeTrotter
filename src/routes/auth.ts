import express, { Router } from "express";
import authController from "../controllers/auth/auth.controller";
import socialRouter from "../providers/auth/setup";

class AuthRoutes {
  private router: Router;
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.use(socialRouter);
    this.router.post("/login", authController.login.bind(authController));
    this.router.post("/signup", authController.register.bind(authController));
    this.router.post(
      "/verify-email",
      authController.verifyEmail.bind(authController),
    );
    this.router.get(
      "/refresh-token",
      authController.refreshToken.bind(authController),
    );
  }

  getRouter() {
    return this.router;
  }
}

export default new AuthRoutes().getRouter();
