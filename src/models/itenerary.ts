import mongoose from "../providers/database/connection";
import { iteneraryItemSchema } from "./iteneraryItems";

const { Schema, model, Types } = mongoose;

const itenerarySchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: "USER",
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  sharedWith: [Types.ObjectId],
  createdAt: { type: Date, default: Date.now() },
});

itenerarySchema.pre('save', function(){

})

const Itenerary = model("Itenerary", itenerarySchema);

export { Itenerary, itenerarySchema };
