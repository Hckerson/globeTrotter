import jwt from "jsonwebtoken";
import { logger } from "../../lib/logger";
import { NextFunction, Request, Response } from "express";
import { config } from "../../common/config";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization = "" } = req.headers;

    if (
      authorization.trim().length === 0 ||
      !authorization.trim().startsWith("Bearer ")
    ) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // verify token
    const token = authorization.split("Bearer ")[1];
    const payload = jwt.verify(
      token,
      config.auth.jwtSecret || "",
    ) as jwt.JwtPayload;

    if (payload) {
      const userId = payload?.userId;

      // find user
      const user = []
    }
  } catch (error) {
    logger.error("Error in auth middleware", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
export { authMiddleware };
