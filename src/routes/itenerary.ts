import { Router } from "express";
import iteneraryController from "../controllers/itenerary/itenerary-controller";


export class IteneraryRoute {
  private router: Router;
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      "/itenerary/create",
      iteneraryController.CreateItenerary.bind(iteneraryController),
    );
  }

  getRouter() {
    return this.router;
  }
}

export default new IteneraryRoute().getRouter();
