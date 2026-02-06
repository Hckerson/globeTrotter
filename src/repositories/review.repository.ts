import { Types } from "mongoose";
import { logger } from "../lib/logger";
import { Review } from "../models/review";
import { IReview } from "../common/interface/models";

export class ReviewRepository {
  private review: typeof Review;

  constructor() {
    this.review = Review;
  }

  async createReview(review: Partial<IReview>) {
    try {
      const response = await this.review.create(review);
      return response;
    } catch (error) {
      logger.error("Error creating review", error);
      throw error;
    }
  }

  async fetchAllReview(userId: Types.ObjectId) {
    try {
      const response = await this.review.find({ userId });
      return response;
    } catch (error) {
      logger.error("Error fetching reviews", error);
      throw error;
    }
  }
}
