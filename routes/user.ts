import express from "express";
import userController from "../controllers/userController";

class UserRoutes {
  private router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      "/users/profile",
      userController.getProfile.bind(userController)
    );
  }

  getRouter() {
    return this.router;
  }
}

export default new UserRoutes().getRouter()