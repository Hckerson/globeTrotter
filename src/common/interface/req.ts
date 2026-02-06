import { IUser } from "./models";
import { Document } from "mongoose";
import { Request } from "express";

export interface RequestWithUser extends Request {
  user?: IUser & Document;
}
