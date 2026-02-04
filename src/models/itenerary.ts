import mongoose from "../providers/database/connection";
import { IItenerary } from "../common/interface/models";

const { Schema, model, Types } = mongoose;
const itenerarySchema = new Schema<IItenerary>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "USER",
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  sharedWith: [Schema.Types.ObjectId],
  createdAt: { type: Date, default: Date.now() },
});

itenerarySchema.pre("save", function () {});

const Itenerary = model("Itenerary", itenerarySchema);

export { Itenerary, itenerarySchema };
