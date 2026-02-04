import { Types } from "mongoose";

export interface IReview {
  id?: Types.ObjectId;
  userId: Types.ObjectId;
  destinationId: Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
}
