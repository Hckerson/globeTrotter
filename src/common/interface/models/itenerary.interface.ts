import { Types } from "mongoose";

export interface IItenerary {
  id?: string;
  userId: Types.ObjectId;
  title: string;
  description: string;
  sharedWith: Types.ObjectId[];
  createdAt: Date;
}
