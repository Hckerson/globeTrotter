const { Schema, Types } = mongoose;
import { IReview } from "../common/interface/models";
import mongoose from "../providers/database/connection";

const reviewSchema = new Schema<IReview>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  destinationId: { type: Schema.Types.ObjectId, ref: "Destination", required: true },
  rating: { type: Number, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

const Review = mongoose.model("Review", reviewSchema);

export { Review, reviewSchema };
