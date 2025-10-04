import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import mongoose from "../providers/database/connection";
const { Schema } = mongoose;
const {} = process.env;

const SALT_HASH = 10;

const reviewSchema = new Schema({
  _id: { type: "UUID", default: () => randomUUID() },
  userId: { type: "UUID", ref: "User" },
});

const Review = mongoose.model("Review", reviewSchema);

export { Review, reviewSchema };
