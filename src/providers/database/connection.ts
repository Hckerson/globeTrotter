import mongoose from "mongoose";
const { MONGO_USERNAME, MONGO_PASSWORD } = process.env;

const MONGO_CONNECTION_STRING = `mongodb+srv://${MONGO_USERNAME}:${encodeURIComponent(
  MONGO_PASSWORD ?? "",
)}@globetrotter.0yyk4lm.mongodb.net/globe?retryWrites=true&w=majority&appName=globeTrotter`;

async function connectMongoose() {
  mongoose.connection.on("connected", () => console.log("connected"));
  mongoose.connection.on("open", () => console.log("open"));
  mongoose.connection.on("disconnected", () => console.log("disconnected"));
  mongoose.connection.on("reconnected", () => console.log("reconnected"));
  mongoose.connection.on("disconnecting", () => console.log("disconnecting"));
  mongoose.connection.on("close", () => console.log("close"));

  await mongoose
    .connect(MONGO_CONNECTION_STRING)
    .then(() => console.log("Mongo connection succesfully established"))
    .catch((err) => console.log("Mongo connection error", err));
}

connectMongoose();

export default mongoose;
