import express, { Router } from "express";

class AdminRoute {
  private router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/users/all", )
  }

  getRouter() {
    return this.router;
  }
}

export default new AdminRoute().getRouter();
