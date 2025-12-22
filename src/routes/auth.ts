import express from "express";
import authController from "../controllers/auth-controller";

const { Router } = express;

class AuthRoutes {
  private router;
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/auth/login", authController.login.bind(authController));
    this.router.post(
      "/auth/signup",
      authController.register.bind(authController)
    );
    this.router.get(
      "/auth/verify-email",
      authController.verifyEmail.bind(authController)
    );
  }

  getRouter() {
    return this.router;
  }
}

export default new AuthRoutes().getRouter();
