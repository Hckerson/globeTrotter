import express, { Router } from "express";

class DestinationRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/destination");
  }

  getRouter() {
    return this.router;
  }
}

export default new DestinationRoutes().getRouter();
