import { Response } from "express";
import { IReview } from "../../common/interface/models";
import { ReviewRepository } from "../../repositories/review.repository";
import { Types } from "mongoose";
import { logger } from "../../lib/logger";

export class ReviewService {
  private review: ReviewRepository;
  constructor() {
    this.review = new ReviewRepository();
  }

  async createReview(res: Response, review: Partial<IReview>) {
    try {
      const reviewData = await this.review.createReview(review);
      return res.status(201).json({
        message: "Review created successfully",
        reviewData,
      });
    } catch (error) {
      logger.error("Error creating review", error);
      throw error;
    }
  }

  async fetchAllReview(res: Response, userId: Types.ObjectId) {
    try {
      const reviewData = await this.review.fetchAllReview(userId);
      return res.status(200).json({
        message: "Review fetched successfully",
        reviewData,
      });
    } catch (error) {
      logger.error("Error fetching review", error);
      throw error;
    }
  }
}
