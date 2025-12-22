import express from "express";
import userController from "../controllers/userController";
import { authMiddleware } from "../common/middleware/authMiddleware";

class UserRoutes {
  private router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      "/users/profile",
      authMiddleware,
      userController.getProfile.bind(userController)
    );
  }

  getRouter() {
    return this.router;
  }
}

export default new UserRoutes().getRouter();
