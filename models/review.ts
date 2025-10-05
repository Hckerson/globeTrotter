
import { randomUUID } from "crypto";
import mongoose from "../providers/database/connection";
const { Schema } = mongoose;
const {} = process.env;


const reviewSchema = new Schema({
  userId: { type: "UUID", ref: "User" },
});

const Review = mongoose.model("Review", reviewSchema);

export { Review, reviewSchema };
