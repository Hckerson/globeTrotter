import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken'

const frontendUrl = process.env.FRONTEND_URL
const jwtsecret = process.env.JWT_SECRET || ""

const getTokenFromHeader = async (
  req: Request,
) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    return token;
  }
  return null;
};


const AuthMiddleware  = async (req: Request, res: Response, next: NextFunction) => {
  
  const token = await getTokenFromHeader(req)

  if(!token){
    return res.status(401).json({
      message:"Access denied!, no token provide",
      redirect:`${frontendUrl}/${encodeURIComponent(req.originalUrl)}`
    })
  }
  const decodedPayload = jwt.verify(token,jwtsecret )

  
}

