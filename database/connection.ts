import * as mongoose from "mongoose";
const { MONGO_USERNAME, MONGO_PASSWORD } = process.env;

const MONGO_CONNECTION_STRING = `mongodb+srv://${MONGO_USERNAME}:${encodeURIComponent(
  MONGO_PASSWORD ?? ""
)}@globetrotter.0yyk4lm.mongodb.net/globe?retryWrites=true&w=majority&appName=globeTrotter`;

async function connectMongoose() {
  await mongoose
    .connect(MONGO_CONNECTION_STRING)
    .then(() => console.log("Mongo connection succesfully established"))
    .catch((err) => console.log("Mongo connection error", err));
}

connectMongoose();

export default mongoose