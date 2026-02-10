import { Types } from "mongoose";
import { IIteneraryItem } from "./itenerary-item.interface";

export interface IItenerary {
  id?: string;
  userId: Types.ObjectId;
  title: string;
  description: string;
  sharedWith: Types.ObjectId[];
  createdAt: Date;
  iteneraryItems?: IIteneraryItem[];
}
