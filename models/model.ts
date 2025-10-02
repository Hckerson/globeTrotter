import bcrypt from "bcryptjs";
const { Schema } = mongoose;
import { randomUUID } from "crypto";
import * as mongoose from "mongoose";
const { JWT_SECRET, MONGO_USERNAME, MONGO_PASSWORD } = process.env;

const MONGO_CONNECTION_STRING = `mongodb+srv://${MONGO_USERNAME}:${encodeURIComponent(
  MONGO_PASSWORD ?? ""
)}@globetrotter.0yyk4lm.mongodb.net/globe?retryWrites=true&w=majority&appName=globeTrotter`;
const SALT_HASH = 10;

async function connectMongoose() {
  await mongoose
    .connect(MONGO_CONNECTION_STRING)
    .then(() => console.log("Mongo connection succesfully established"))
    .catch((err) => console.log("Mongo connection error", err));
}

connectMongoose();

const reviewSchema = new Schema({
  _id: { type: "UUID", default: () => randomUUID() },
  userId: { type: "UUID", ref: "User" },
});

const Review = mongoose.model("Review", reviewSchema);

const userSchema = new Schema({
  _id: { type: "UUID", default: () => randomUUID() },
  fullName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  email: { type: String, required: true, unique: true, index: true },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  password: { type: String, required: true },
  reviews: [reviewSchema],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, SALT_HASH);
  next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  console.log("update", this.getUpdate());
  const update = this.getUpdate() as any;

  if (update && update.password) {
    update.password = bcrypt.hash(update.password, SALT_HASH);
  }
  next();
});

const User = mongoose.model("User", userSchema);

export { User, Review };
