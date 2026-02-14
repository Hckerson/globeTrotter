import mongoose from "mongoose";
import { logger } from "../../lib/logger";
const { MONGO_USERNAME, MONGO_PASSWORD } = process.env;

const MONGO_CONNECTION_STRING = `mongodb+srv://${MONGO_USERNAME}:${encodeURIComponent(
  MONGO_PASSWORD ?? "",
)}@globetrotter.0yyk4lm.mongodb.net/globe?retryWrites=true&w=majority&appName=globeTrotter`;

async function connectMongoose() {
  mongoose.connection.on("connected", () =>
    logger.log("Mongo connected successfully"),
  );
  mongoose.connection.on("disconnected", () =>
    logger.log("Mongo disconnected disconnected succesful"),
  );
  mongoose.connection.on("reconnected", () =>
    logger.log("Mongo reconnected reconnected succesful "),
  );

  await mongoose
    .connect(MONGO_CONNECTION_STRING)
    .then(() => logger.log("Mongo connection succesfully established"))
    .catch((err) => logger.log("Mongo connection error", err));
}

connectMongoose();

export default mongoose;
