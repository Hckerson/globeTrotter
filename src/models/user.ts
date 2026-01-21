import bcrypt from "bcryptjs";
import { reviewSchema } from "./review";
import mongoose from "../providers/database/connection";

const { Schema } = mongoose;

const SALT_HASH = 10;

const userSchema = new Schema(
  {
    username: { type: String, required: true, lowercase: true },
    createdAt: { type: Date, default: Date.now() },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    role: { type: String, enum: ["admin", "user"], required: true },
    password: { type: String, required: true, minLength: 4, maxLength: 12 },
    reviews: [reviewSchema],
  },
  {
    virtuals: {
      fullName: {
        get() {
          return this.firstName + "" + this.lastName;
        },
      },
    },
  },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, SALT_HASH);
  next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as any;

  if (update && update.password) {
    update.password = bcrypt.hash(update.password, SALT_HASH);
  }
  next();
});

const User = mongoose.model("User", userSchema);

const a = new User();
a.fullName;

export { User, userSchema };
