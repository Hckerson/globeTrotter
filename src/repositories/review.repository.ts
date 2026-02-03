import { logger } from "../lib/logger";
import { Review } from "../models/review";

export class ReviewRepository {
  private review: typeof Review

  constructor() {
    this.review = Review
  }

  async createReview(review) {
    try {
      const response = await this.review.create(review);
      return response;
    } catch (error) {
      logger.error("Error creating review", error);
      throw error;
    }
  }
}