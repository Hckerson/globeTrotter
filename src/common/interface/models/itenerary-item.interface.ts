import { Types } from "mongoose";

export interface IIteneraryItem {
  id?: Types.ObjectId;
  iteneraryId: Types.ObjectId;
  dayNumber: number;
  experienceId: Types.ObjectId;
  notes?: string;
  createdAt: Date;
}
