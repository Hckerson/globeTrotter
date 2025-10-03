import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { reviewSchema } from "./review";
import mongoose from "../database/connection";

const { Schema } = mongoose;

const SALT_HASH = 10;

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

export { User, userSchema };
