import { Types } from "mongoose";
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: Types.ObjectId;
        role: string;
      };
    }
  }
}

export interface RequestWithUser extends Request {
  user?: {
    _id: Types.ObjectId;
    role: string;
  };
}
