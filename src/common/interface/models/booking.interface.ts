import { Types } from "mongoose";

export interface IBooking {
  userId: Types.ObjectId;
  iteneraryId?: Types.ObjectId;
  status: "PENDING" | "CONFIRMED" | "CANCELLED"[];
  createdAt: Date;
}
