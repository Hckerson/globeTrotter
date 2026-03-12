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
    this.router.post("/auth/login", authController.login.bind(authController));
    this.router.post(
      "/auth/signup",
      authController.register.bind(authController),
    );
    this.router.post(
      "/auth/verify-email",
      authController.verifyEmail.bind(authController),
    );
    this.router.get(
      "/auth/refresh-token",
      authController.refreshToken.bind(authController),
    );
    this.router.use("/auth", socialRouter);
  }

  getRouter() {
    return this.router;
  }
}

export default new AuthRoutes().getRouter();
