import express, { Router } from "express";
import authRoute from "./auth";
import userRoute from "./user";
import reviewRoute from "./review";
import bookingRoute from "./booking";
import iteneraryRoute from "./itenerary";
import experiencesRoute from "./experiences";
import destinationRoute from "./destinations";

class BaseRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.use(authRoute);
    this.router.use(userRoute);
    this.router.use(reviewRoute);
    this.router.use(bookingRoute);
    this.router.use(iteneraryRoute);
    this.router.use(destinationRoute);
    this.router.use(experiencesRoute);
  }

  getRouter() {
    return this.router;
  }
}

export default new BaseRoutes().getRouter();
