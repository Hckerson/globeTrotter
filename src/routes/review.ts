import express, { Router } from "express";

class ReviewRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/booking");
  }

  getRouter() {
    return this.router;
  }
}

export default new ReviewRoutes().getRouter();
