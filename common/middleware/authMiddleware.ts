import * as jwt from "jsonwebtoken";
import { User } from "../../models/user";
import { RequestWithUser } from "../../types/req";
import { Request, Response, NextFunction } from "express";

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

const authMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
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

    if(error instanceof jwt.TokenExpiredError){
      return res.status(401).json({
        error:"Invalid token",
        description:"Token is expired"
      })
    }

    return res.status(500).json({
      error: "Internal Server error"
    })
  }
};


export {authMiddleware}