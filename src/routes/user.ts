import express, { Router } from "express";
import userController from "../controllers/user/user-controller";

class UserRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      "/users/profile",
      userController.getProfile.bind(userController),
    );

    this.router.post("/users", userController.getAllUser.bind(userController));

    this.router.post("/users/review", userController.getAllUser.bind(userController));
  }

  getRouter() {
    return this.router;
  }
}

export default new UserRoutes().getRouter();
