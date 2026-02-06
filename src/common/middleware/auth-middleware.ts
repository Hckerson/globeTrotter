import jwt from "jsonwebtoken";
import { logger } from "../../lib/logger";
import { config } from "../../common/config";
import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "../interface/req";
import { UserRepository } from "../../repositories/user.repository";
import { CodeRepository } from "../../repositories/code.repository";

const users = new UserRepository();
const codes = new CodeRepository();

const authMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
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
    const { verified, data } = await verifyAuthHeader(token);
    if (!verified) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    console.log(data);
    return next();
  } catch (error) {
    logger.error("Error in auth middleware", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

async function verifyAuthHeader(token: string) {
  if (!token) return { verified: false, data: null };

  try {
    const payload = jwt.verify(
      token,
      config.auth.jwtSecret || "",
    ) as jwt.JwtPayload;

    if (payload) {
      const userId = payload?.userId;

      // check if token is valid

      const code = await codes.fetchCodeById(userId, "refresh-token");

      if (
        !code ||
        code.expiresAt < new Date() ||
        code.code !== token ||
        code.type !== "refresh-token" ||
        code.userId !== userId
      ) {
        return { verified: false, data: null };
      }

      // find user
      const user = await users.findUserById(userId);

      if (user) {
        return { verified: true, data: user };
      }
    }

    return { verified: false, data: null };
  } catch (error) {
    logger.error("Error verifying auth header", error);
    return { verified: false, data: null };
  }
}

export { authMiddleware, verifyAuthHeader };
