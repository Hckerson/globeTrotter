import { Request } from "express";

export interface RequestWithUser extends Request {
  user?: {
    id: Buffer<ArrayBufferLike>;
    role: string
  };
}
