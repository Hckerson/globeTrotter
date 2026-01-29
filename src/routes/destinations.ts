import express, { Router } from "express";
import destinationController from "../controllers/destination/destination.controller";

class DestinationRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      "/destination/search",
      destinationController.fetchLocationData.bind(destinationController),
    );
  }

  getRouter() {
    return this.router;
  }
}

export default new DestinationRoutes().getRouter();
