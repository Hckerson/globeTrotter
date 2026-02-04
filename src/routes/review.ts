import express, { Router } from "express";
import reviewController from "../controllers/review/review.controller";

class ReviewRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post("/review/new", reviewController.createReview.bind(reviewController));
    this.router.get("/review/all", reviewController.fetchAllReviews.bind(reviewController));
  }

  getRouter() {
    return this.router;
  }
}

export default new ReviewRoutes().getRouter();
