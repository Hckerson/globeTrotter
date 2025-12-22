import { NextFunction, Request, Response } from "express";

const errorMiddleWare = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {};
export { errorMiddleWare };
