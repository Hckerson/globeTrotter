import mongoose from "../providers/database/connection";
const { Schema, Types } = mongoose;

const reviewSchema = new Schema({
  userId: { type: Types.ObjectId, ref: "User", required: true },
  destinationId: { type: Types.ObjectId, ref: "Destination", required: true },
  rating: { type: Number, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

const Review = mongoose.model("Review", reviewSchema);

export { Review, reviewSchema };
