import mongoose from "../providers/database/connection";

const { Schema, model, Types } = mongoose;

const bookingSchema = new Schema({
  userId: { type: Types.ObjectId, ref: "User", required: true },
  iteneraryId: { type: Types.ObjectId, ref: "Itenerary" },
  status: { type: String, enum: ["PENDING", "CONFIRMED", "CANCELLED"] },
  createdAt: { type: Date, default: Date.now() },
});

const Booking = model("Booking", bookingSchema);

export { Booking, bookingSchema };
