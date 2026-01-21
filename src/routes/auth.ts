import express, { Router } from "express";
import authController from "../controllers/auth-controller";

class AuthRoutes {
  private router: Router;
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post("/auth/login", authController.login.bind(authController));
    this.router.post(
      "/auth/google/login",
      authController.login.bind(authController),
    );
    this.router.post(
      "/auth/signup",
      authController.register.bind(authController),
    );
    this.router.post(
      "/auth/verify-email",
      authController.verifyEmail.bind(authController),
    );
  }

  getRouter() {
    return this.router;
  }
}

export default new AuthRoutes().getRouter();
