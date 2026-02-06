import { Request, Response } from "express";
import { ReviewService } from "./review.service";
import { IReview } from "../../common/interface/models";
import { RequestWithUser } from "../../common/interface/req";

class ReviewController {
  private reviewService: ReviewService;

  constructor() {
    this.reviewService = new ReviewService();
  }
  async createReview(req: RequestWithUser, res: Response) {
    const review = req.body as Partial<IReview>;
    if (!review) {
      return res.status(400).json({
        message: "Review is required",
      });
    }
    return this.reviewService.createReview(res, review);
  }

  async fetchAllReviews(req: RequestWithUser, res: Response) {
    const userId = req?.user?._id;
    if (!userId) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    return this.reviewService.fetchAllReview(res, userId);
  }
}

export default new ReviewController();
