import mongoose from "../providers/database/connection";
import { IExperience } from "../common/interface/models";

const { Schema, model } = mongoose;

const experienceSchema = new Schema<IExperience>({
  destinationId: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  price: {
    min: Number,
    max: Number,
  },
  rating: Number,
});

const Experience = model("Experience", experienceSchema);

export { Experience, experienceSchema };
