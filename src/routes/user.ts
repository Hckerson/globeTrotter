import express, { Router } from "express";
import userController from "../controllers/user/user-controller";
import { authMiddleware } from "../common/middleware/auth-middleware";

class UserRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      "/users/profile",
      authMiddleware,
      userController.getProfile.bind(userController),
    );
  }

  getRouter() {
    return this.router;
  }
}

export default new UserRoutes().getRouter();
