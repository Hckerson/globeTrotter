import { Request, Response } from "express";
import { ReviewService } from "./review.service";
import { IReview } from "../../common/interface/models";
 
class ReviewController {
  private reviewService: ReviewService

  constructor(){
    this.reviewService = new ReviewService();
  }
  async createReview(req: Request, res: Response) {
    const review = req.body as Partial<IReview>  
    if(!review){
      return res.status(400).json({
        message: "Review is required",
      });
    }
    return this.reviewService.createReview(res, review);
  }

  async fetchAllReviews(req: Request, res: Response) {
    
  }
}


export default new ReviewController()