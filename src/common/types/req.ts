import { Request } from "express";
import { Types } from "mongoose";

export interface RequestWithUser extends Request {
  user?: {
    id:  Types.ObjectId;
    role: string
  };
}
