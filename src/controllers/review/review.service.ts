import { IReview } from "../../common/interface/models";
import { ReviewRepository } from "../../repositories/review.repository";

export class ReviewService {
  private review: ReviewRepository;
  constructor (){
    this.review = new ReviewRepository();
  }

  async createReview(review: Partial<IReview>){
    return this.review.createReview(review);
  }
}