import { Request, Response } from "express";
import { ReviewService } from "./review.service";
import { IReview } from "../../common/interface/models";
 
class ReviewController {
  private reviewService: ReviewService

  constructor(){
    this.reviewService = new ReviewService();
  }
  async createReview(req: Request, res: Response) {
    const reviews = req.body as Partial<IReview>  
    
  }

  async fetchAllReviews(req: Request, res: Response) {
    
  }
}


export default new ReviewController()