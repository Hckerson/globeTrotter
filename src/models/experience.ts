import mongoose from "../providers/database/connection";

const { Schema, model } = mongoose;

const experienceSchema = new Schema({
  destinationId: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  price: {
    min: Number,
    max: Number,
  },
  rating: String,
});

const Experience = model("Experience", experienceSchema);

export { Experience, experienceSchema };
