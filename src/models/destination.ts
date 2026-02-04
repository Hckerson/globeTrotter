import mongoose from "../providers/database/connection";
import { IDestination } from "../common/interface/models";

const { Schema, model } = mongoose;

const destinationSchema = new Schema<IDestination>({
  name: { type: String },
  location: {
    address: String,
    coordinates: String,
    country: String,
    state: String,
  },
  type: { 
    type: String,
    enum: ["city", "country", "natural"],
  },
  description: String,
  images: [String],
  avgCost: { type: Number },
  createdAt: { type: Date, default: Date.now() },
});

const Destination = model("Destination", destinationSchema);

export { Destination, destinationSchema };
