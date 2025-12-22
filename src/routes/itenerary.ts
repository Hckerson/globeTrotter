import { Router } from "express";
import { authMiddleware } from "../common/middleware/authMiddleware";
import iteneraryController from "../controllers/iteneraryController";

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
