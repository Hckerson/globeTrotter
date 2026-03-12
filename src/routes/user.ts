import express, { Router } from "express";
import userController from "../controllers/user/user-controller";

class UserRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/profile", userController.getProfile.bind(userController));
  }

  getRouter() {
    return this.router;
  }
}

export default new UserRoutes().getRouter();
