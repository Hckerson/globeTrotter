import mongoose from "../providers/database/connection";
import { IBooking } from "../common/interface/models";

const { Schema, model } = mongoose;

const bookingSchema = new Schema<IBooking>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  iteneraryId: { type: Schema.Types.ObjectId, ref: "Itenerary" },
  status: { type: String, enum: ["PENDING", "CONFIRMED", "CANCELLED"] },
  createdAt: { type: Date, default: Date.now() },
});

const Booking = model("Booking", bookingSchema);

export { Booking, bookingSchema };
