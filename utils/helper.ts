import * as jwt from "jsonwebtoken";
import { User } from "../models/user";
import { Request, Response, NextFunction } from "express";
import { RequestWithUser } from "../types/req";

const frontendUrl = process.env.FRONTEND_URL;
const jwtsecret = process.env.JWT_SECRET || "";

const getTokenFromHeader = async (req: Request) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    return token;
  }
  return null;
};

const AuthMiddleware = async (
  res: Response,
  next: NextFunction,
  req: RequestWithUser
) => {
  const token = await getTokenFromHeader(req);

  if (!token) {
    return res.status(401).json({
      message: "Access denied!, no token provide",
      redirect: `${frontendUrl}/${encodeURIComponent(req.originalUrl)}`,
    });
  }

  try {
    const decodedPayload = jwt.verify(token, jwtsecret) as jwt.JwtPayload;

    const userId = decodedPayload.userId;

    const user = User.findOne({ id: userId });

    if (!user) {
      return res.status(401).json({
        error: "Invalid token",
      });
    }

    req.user!.id = userId;
    next();
  } catch (error) {
    console.error("Error running auth middleware", error);
    throw error;
  }
};
