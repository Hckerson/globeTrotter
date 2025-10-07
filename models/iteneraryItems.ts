import mongoose from "../providers/database/connection";

const { Schema, model, Types } = mongoose;

const iteneraryItemSchema = new Schema({
  iteneraryId: { type: Types.ObjectId, required: true, ref: "Itenerary" },
  dayNumber: { type: Number, required: true },
  experienceId: { type: Types.ObjectId, required: true, ref: "Experience" },
  notes: String,
  createdAt: { type: Date, default: Date.now() },
});

const IteneraryItem = model("IteneraryItem", iteneraryItemSchema);


export {IteneraryItem, iteneraryItemSchema}