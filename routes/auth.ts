import express from "express";
import authController from "../controllers/authController";

const { Router } = express;

class AuthRoutes {
  private router;
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post("/login", authController.login.bind(authController));
    this.router.post("/signup", authController.register.bind(authController));
  }

  getRouter() {
    return this.router;
  }
}

export default new AuthRoutes().getRouter();
