import { IReview } from "./review.interface";

export interface IUser {
  id?: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  role: "admin" | "user" | "partner";
  password?: string;
  reviews?: IReview[];
  createdAt: Date;
  fullName?: string;
}
