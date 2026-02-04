import mongoose from "../providers/database/connection";
import { IIteneraryItem } from "../common/interface/models";

const { Schema, model } = mongoose;

const iteneraryItemSchema = new Schema<IIteneraryItem>({
  iteneraryId: { type: Schema.Types.ObjectId,ref: "Itenerary" },
  dayNumber: { type: Number, required: true },
  experienceId: { type: Schema.Types.ObjectId, required: true, ref: "Experience" },
  notes: String,
  createdAt: { type: Date, default: Date.now() },
});

const IteneraryItem = model("IteneraryItem", iteneraryItemSchema);


export {IteneraryItem, iteneraryItemSchema}