import express, { Router } from "express";

class ExperienceRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/new");
  }

  getRouter() {
    return this.router;
  }
}

export default new ExperienceRoutes().getRouter();
