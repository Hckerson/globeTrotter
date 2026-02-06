import { Response } from "express";
import { IReview } from "../../common/interface/models";
import { ReviewRepository } from "../../repositories/review.repository";

export class ReviewService {
  private review: ReviewRepository;
  constructor (){
    this.review = new ReviewRepository();
  }

  async createReview(res: Response, review: Partial<IReview>){
    try{
    const reviewData = await this.review.createReview(review);
    return res.status(200).json({
      message: "Review created successfully",
      reviewData,
    });
  }catch(error){
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
  }
}