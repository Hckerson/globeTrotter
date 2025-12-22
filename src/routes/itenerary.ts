import { Router } from "express";
import { authMiddleware } from "../common/middleware/auth-middleware";
import iteneraryController from "../controllers/itenerary-controller";

export class IteneraryRoute {
  private router;
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      "/itenerary/create",
      authMiddleware,
      iteneraryController.CreateItenerary.bind(iteneraryController)
    );
  }

  getRouter() {
    return this.router;
  }
}

export default new IteneraryRoute().getRouter();
