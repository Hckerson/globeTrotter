import authRoute from "./auth";
import userRoute from "./user";
import adminRoute from "./admin";
import reviewRoute from "./review";
import bookingRoute from "./booking";
import iteneraryRoute from "./itenerary";
import analyticsRoute from "./analytics";
import express, { Router } from "express";
import experiencesRoute from "./experiences";
import destinationRoute from "./destinations";

class BaseRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.use("/auth", authRoute);
    this.router.use("/user", userRoute);
    this.router.use("/admin", adminRoute);
    this.router.use("/review", reviewRoute);
    this.router.use("/booking", bookingRoute);
    this.router.use("/analytics", analyticsRoute);
    this.router.use("/itenerary", iteneraryRoute);
    this.router.use("/experiences", experiencesRoute);
    this.router.use("/destination", destinationRoute);
  }

  getRouter() {
    return this.router;
  }
}

export default new BaseRoutes().getRouter();
