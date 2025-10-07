import mongoose from "../providers/database/connection";
const { Schema, Types } = mongoose;
const {} = process.env;


const reviewSchema = new Schema({
  userId: { type: Types.ObjectId, ref: "User" },
});

const Review = mongoose.model("Review", reviewSchema);

export { Review, reviewSchema };
